
export interface currentAccountInterface {
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

export interface authorNameInterface {
    url: string
    profile_image_url: string
    username: string
    created_at: string
    id: string
    description: string
    name: string
    verified: boolean
}

export interface finalListInterface {
    id: string
    author_id: string
    created_at: string
    lang: string
    text: string
    links: string[]
    images: string[]
    author_name: authorNameInterface
    referenced_tweets?: any
  }

export interface localStoredInterface {
    currentUsername: string
    currentId: string
    nextToken: string
    finalListPosts: finalListInterface[]
    totalVideos: number
    totalPictures: number
}

export interface postsDataInterface {
    posts?: {
        data: {
            entities?: {
                mentions?: [
                    {
                        start: number
                        end: number
                        username: string
                        id: string
                    }
                ],
                urls?: {
                    start: number
                    end: number
                    url: string
                    expanded_url: string
                    display_url: string
                }[]
                hashtags?: {
                    start: number
                    end: number
                    tag: string
                }[]
            },
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
        }[]
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
        }
    }
}

export interface providerValuesInterface {
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
    allPosts: postsDataInterface
    setAllPosts: React.Dispatch<React.SetStateAction<postsDataInterface>>
    finalList: finalListInterface[]
    setFinalList: React.Dispatch<React.SetStateAction<finalListInterface[]>>
    dataLoading: boolean
    setDataLoading:React.Dispatch<React.SetStateAction<boolean>>
    autoDownload: boolean
    setAutoDownload: React.Dispatch<React.SetStateAction<boolean>>
    advanceToggle: boolean
    setAdvanceToggle: React.Dispatch<React.SetStateAction<boolean>>
    localStored: localStoredInterface
    setLocalStored: React.Dispatch<React.SetStateAction<localStoredInterface>>
}
