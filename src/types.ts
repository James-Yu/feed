export interface Venue {
    name: string,
    acronym: string,
    publisher: string,
    pubid: number
}

export interface IEEEMeta {
    issns:                        Issn[];
    frequency:                    string;
    aimsAndScope:                 string;
    coverImage:                   string;
    coverImagePath:               string;
    impactFactor:                 string;
    contentId:                    number;
    citeScore:                    string;
    articleInfluenceMetricScore:  string;
    eigenFactorScore:             string;
    shortAimsAndScope:            string;
    submitManuscriptLink:         string;
    publicationDetailsLink:       string;
    publicationSponsorSocietyUrl: string;
    publicationEicDetailsOne:     string;
    authorDigitalToolBoxLink:     string;
    openAccessPublishingOptions:  string;
    additionalInfoForJournal:     string;
    becomeReviewerUrl:            string;
    submissionGuidelinesLink:     string;
    coverImageAttrs:              string;
    showSpecialSections:          boolean;
    showSocietySections:          boolean;
    showPopular:                  boolean;
    publicationYear:              string;
    publicationNumber:            string;
    publisher:                    string;
    parentPublicationNumber:      string;
    doiLink:                      string;
    coverImageHtml:               string;
    displayTitle:                 string;
    partNumVendorUrlMediaType:    string[];
    bmsProductNumber:             string;
    contentType:                  string;
    currentIssue:                 CurrentIssue;
    preprintIssue:                PreprintIssue;
    isMegaJournal:                boolean;
    isVolumeOnlyJrnl:             boolean;
    isVolumeOnly:                 boolean;
    pubTopics:                    PubTopic[];
    isOpenAccess:                 boolean;
    publicationDoi:               string;
    isVJ:                         boolean;
}

interface CurrentIssue {
    volume:               string;
    issue:                string;
    issueNumber:          number;
    publicationDateAsStr: string;
    year:                 string;
    month:                string;
}

interface Issn {
    format: string;
    value:  string;
}

interface PreprintIssue {
    volume:      string;
    issue:       string;
    issueNumber: number;
}

interface PubTopic {
    name: string;
}

export interface IEEEToC {
    userInfo:                 UserInfo;
    records:                  IEEERecord[];
    showStandardDictionary:   boolean;
    searchType:               string;
    totalRecords:             number;
    endRecord:                number;
    totalPages:               number;
    startRecord:              number;
    subscribedContentApplied: boolean;
    promoApplied:             boolean;
    facets:                   Facet[];
}

interface Facet {
    id:         string;
    name:       string;
    numRecords: number;
    children?:  Facet[];
    active:     string;
}

export interface IEEERecord {
    authors:                 Author[];
    patentCitationCount:     number;
    publicationYear:         string;
    volume:                  string;
    issue:                   string;
    publicationNumber:       string;
    documentLink:            string;
    articleNumber:           string;
    doi:                     string;
    citationCount:           number;
    isNumber:                string;
    showAlgorithm:           boolean;
    showDataset:             boolean;
    showVideo:               boolean;
    ephemera:                boolean;
    vj:                      boolean;
    articleTitle:            string;
    graphicalAbstract:       GraphicalAbstract;
    publicationDate:         string;
    rightslinkFlag:          boolean;
    pdfSize:                 string;
    startPage:               string;
    endPage:                 string;
    downloadCount:           number;
    htmlLink:                string;
    showHtml:                boolean;
    publisher:               'IEEE';
    handleProduct:           boolean;
    redline:                 boolean;
    showCheckbox:            boolean;
    highlightedTitle:        string;
    abstract:                string;
    pdfLink:                 string;
    isStandard:              boolean;
    isConference:            boolean;
    isJournalAndMagazine:    boolean;
    isEarlyAccess:           boolean;
    isMagazine:              boolean;
    isJournal:               boolean;
    isBook:                  boolean;
    course:                  boolean;
    isBookWithoutChapters:   boolean;
    rightsLink?:             string;
    multiMediaLink?:         string;
}

export interface IEEEBriefRecord {
    authors:                 string[];
    articleNumber:           string;
    articleTitle:            string;
    abstract:                string;
    date:                    Date;
}

interface Author {
    preferredName:           string;
    normalizedName:          string;
    firstName:               string;
    lastName:                string;
    searchablePreferredName: string;
}

interface Author {
    preferredName:           string;
    normalizedName:          string;
    firstName:               string;
    lastName:                string;
    searchablePreferredName: string;
}

interface GraphicalAbstract {
}

interface UserInfo {
    institutionName:              string;
    institute:                    boolean;
    member:                       boolean;
    individual:                   boolean;
    guest:                        boolean;
    subscribedContent:            boolean;
    fileCabinetContent:           boolean;
    fileCabinetUser:              boolean;
    institutionalFileCabinetUser: boolean;
    products:                     string;
    instType:                     string;
    userIds:                      number[];
    showPatentCitations:          boolean;
    showGet802Link:               boolean;
    marketingInfoCaptured:        boolean;
    ringGoldId:                   string;
}
