export interface IdsInterface {
    id: string
    nextToken: string | null
    bearer: string
    maximum: string
}

export interface UserInterface {
    username: string
    bearer: string
}

export interface PostsInterface {
    ids: string[]
    bearer: string
}

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

export interface SystemStateInterface {
    totalPictures: number
    totalVideos: number
    twitterId: string
    twitterUsername: string
    autoDownload: boolean
    nextToken2: string
    isRestore: boolean
    localStored: LocalStoredInterface
    dataLoading: boolean
    mobileNav: boolean
    advanceToggle: boolean
    finalList: FinalListInterface[]
    allPosts: PostsDataInterface
    downloadedPhotoLinks: string[]
}

export interface ProviderValuesInterface {
    systemState: any
    updateSystemState: any
}
