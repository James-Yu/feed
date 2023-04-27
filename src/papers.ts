import fs from 'fs'
import axios from 'axios'
import axiosRetry from 'axios-retry'
import { Feed } from 'feed'

import type { Venue, IEEEMeta, IEEERecord, IEEEBriefRecord, IEEEToC } from './types'

axiosRetry(axios, {
    retries: 5,
    retryDelay: axiosRetry.exponentialDelay
})

class IEEETrans {
    private readonly headers = {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Referer': `https://ieeexplore.ieee.org/xpl/RecentIssue.jsp`
    }
    private archive: IEEEBriefRecord[]
    private archiveFile: string
    private feedFile: string

    constructor(private name: string, private acronym: string, private pubid: number) {
        this.archiveFile = `./data/${this.acronym}.json`
        this.feedFile = `./docs/${this.acronym}.xml`
        this.archive = fs.existsSync(this.archiveFile) ? JSON.parse(fs.readFileSync(this.archiveFile).toString()) as IEEEBriefRecord[] : []
    }

    async retrieve() {
        const meta = await this.getMeta()
        const fullScan = this.archive.length === 0
        const allRecords = [
            ...await this.getIssueRecords(meta.preprintIssue, fullScan),
            ...await this.getIssueRecords(meta.currentIssue, fullScan)
        ]
        console.log(`${allRecords.length} papers parsed.`)
        const archiveIDs = this.archive.map(record => record.articleNumber)
        const newRecords = allRecords.filter(record => record.authors)
            .filter(record => archiveIDs.indexOf(record.articleNumber) === -1)
            .map(this.briefRecord)
        this.archive = [...newRecords, ...this.archive].slice(0, 1000)
        console.log(`${newRecords.length} papers added. ${this.archive.length} in total.`)
        return newRecords
    }

    async write() {
        fs.writeFileSync(this.archiveFile, JSON.stringify(this.archive, null, 2))

        const url = `http://jamesyu.me/feed/${this.acronym}.rss`
        const feed = new Feed({
            id: url,
            link: url,
            title: this.name,
            description: this.name,
            copyright: 'Copyright reserved',
        })
        this.archive.forEach(paper => {
            const paperURL = `https://ieeexplore.ieee.org/document/${paper.articleNumber}`
            feed.addItem({
                id: paperURL,
                link: paperURL,
                title: paper.articleTitle,
                description: paper.abstract,
                date: new Date(paper.date),
                author: paper.authors.map(author => ({ name: author }))
            })
        })
        fs.writeFileSync(this.feedFile, feed.atom1())
    }

    private briefRecord(record: IEEERecord): IEEEBriefRecord {
        return {
            articleNumber: record.articleNumber,
            articleTitle: record.articleTitle,
            authors: record.authors.map(author => author.preferredName),
            abstract: record.abstract,
            date: new Date()
        }
    }

    private async getMeta() {
        const url = `https://ieeexplore.ieee.org/rest/publication/home/metadata?pubid=${this.pubid}`
        console.log(url)
        const response = await axios.get(url, {headers: this.headers})
        const meta: IEEEMeta = response.data
        return {
            currentIssue: meta.currentIssue.issueNumber,
            preprintIssue: meta.preprintIssue.issueNumber
        }
    }

    private async getIssueRecords(issue: number, fullScan?: boolean) {
        const url = `https://ieeexplore.ieee.org/rest/search/pub/${this.pubid}/issue/${issue}/toc`
        console.log(url)
        let records: IEEERecord[] = []
        let pageNum = 1
        do {
            const response = await axios.post(url, {
                'isnumber': issue,
                'sortType': 'vol-only-newest',
                'punumber': this.pubid,
                'pageNumber': pageNum,
                'rowsPerPage': 100
            }, {headers: this.headers})
            const toc: IEEEToC = response.data
            records = [...records, ...toc.records]
            console.log(`${toc.endRecord}/${toc.totalRecords}`)
            pageNum++
            if (toc.totalRecords === toc.endRecord) {
                break
            }
        } while (fullScan)
        return records
    }
}

export async function papers() {
    const venues = JSON.parse(fs.readFileSync('./config.json').toString()) as Venue[]
    for (const venue of venues) {
        console.log(venue.name)
        const trans = new IEEETrans(venue.name, venue.acronym, venue.pubid)
        await trans.retrieve()
        await trans.write()
    }
}
