export interface CrawlerStateInterface {
    loading: boolean
    loading2: boolean
    nextToken: string
    listOfId: string
    bearer: string
    maximum: number
    switcher: boolean
}

export interface CurrentAccountInterface {
    url: string
    name: string
    username: string
    entities: any
    verified: boolean
    profile_image_url: string
    created_at: string
    id: string
    description: string
}

export interface AuthorNameInterface {
    url: string
    profile_image_url: string
    username: string
    created_at: string
    id: string
    description: string
    name: string
    verified: boolean
}

export interface FinalListInterface {
    id: string
    author_id: string
    created_at: string
    lang: string
    text: string
    links: string[]
    images: string[]
    author_name: AuthorNameInterface
    referenced_tweets?: any
}

export interface ReferenceTweetInterface {
    type: string
    id: string
}

export interface LocalStoredInterface {
    currentUsername: string
    currentId: string
    nextToken: string
    finalListPosts: FinalListInterface[]
    totalVideos: number
    totalPictures: number
}

export interface MediaInterface {
    media_key: string
    type: string
    url: string
    expanded_url?: string
}

export interface EntitiesUrlInterface {
    start: number
    end: number
    url: string
    media_key?: string
    expanded_url: string
    display_url: string
}

export interface TweetInterface {
    entities?: {
        mentions?: {
            start: number
            end: number
            username: string
            id: string
        }[]
        urls?: EntitiesUrlInterface[]
        hashtags?: {
            start: number
            end: number
            tag: string
        }[]
    }
    created_at: string
    text: string
    conversation_id: string
    attachments?: {
      media_keys?: string[]
    }
    id: string
    author_id: string
    lang: string
    edit_history_tweet_ids: string[]
    referenced_tweets?: {
        type: string
        id: string
    }[]
    in_reply_to_user_id?: string
}

export interface PostsDataInterface {
    posts?: {
        data: TweetInterface[]
        includes: {
            media?: {
                media_key: string
                type: string
                url: string
            }[]
            users?: {
                username: string
                name: string
                description: string
                id: string
                created_at: string
                profile_image_url: string
                verified: boolean
                url: string
            }[]
            tweeets?: TweetInterface[]
        }
    }
}

export interface ProviderValuesInterface {
    mobileNav: boolean
    setMobileNav: React.Dispatch<React.SetStateAction<boolean>>
    isRestore: boolean
    setIsRestore: React.Dispatch<React.SetStateAction<boolean>>
    totalPictures: number
    setTotalPictures: React.Dispatch<React.SetStateAction<number>>
    totalVideos: number
    setTotalVideos: React.Dispatch<React.SetStateAction<number>>
    twitterId: string
    setTwitterId: React.Dispatch<React.SetStateAction<string>>
    downloadedPhotoLinks: string[]
    setDownloadedPhotoLinks: React.Dispatch<React.SetStateAction<string[]>>
    twitterUsername: string
    setTwitterUsername: React.Dispatch<React.SetStateAction<string>>
    nextToken2: string
    setNextToken2: React.Dispatch<React.SetStateAction<string>>
    allPosts: PostsDataInterface
    setAllPosts: React.Dispatch<React.SetStateAction<PostsDataInterface>>
    finalList: FinalListInterface[]
    setFinalList: React.Dispatch<React.SetStateAction<FinalListInterface[]>>
    dataLoading: boolean
    setDataLoading:React.Dispatch<React.SetStateAction<boolean>>
    autoDownload: boolean
    setAutoDownload: React.Dispatch<React.SetStateAction<boolean>>
    advanceToggle: boolean
    setAdvanceToggle: React.Dispatch<React.SetStateAction<boolean>>
    localStored: LocalStoredInterface
    setLocalStored: React.Dispatch<React.SetStateAction<LocalStoredInterface>>
}
