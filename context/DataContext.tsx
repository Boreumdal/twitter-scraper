'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

export interface finalListInterface {
    id: string
    author_id: string
    created_at: string
    lang: string
    text: string
    images: string[]
    author_name: {
        url: string
        profile_image_url: string
        username: string
        created_at: string
        id: string
        description: string
        name: string
        verified: boolean
    }
  }

export interface localStoredInterface {
    currentUsername: string
    currentId: string
    nextToken: string
    finalListPosts: finalListInterface[]
    totalVideos: number
    totalPictures: number
}

// interface allPostsInterface {
    
// }

export interface providerValuesInterface {
    restored: boolean
    setRestored: React.Dispatch<React.SetStateAction<boolean>>
    totalPictures: number
    setTotalPictures: React.Dispatch<React.SetStateAction<number>>
    totalVideos: number
    setTotalVideos: React.Dispatch<React.SetStateAction<number>>
    twitterId: string
    setTwitterId: React.Dispatch<React.SetStateAction<string>>
    twitterUsername: string
    setTwitterUsername: React.Dispatch<React.SetStateAction<string>>
    nextToken2: string
    setNextToken2: React.Dispatch<React.SetStateAction<string>>
    allPosts: any
    setAllPosts: React.Dispatch<React.SetStateAction<{}>>
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

const DataPostContext = createContext<providerValuesInterface | null>(null)

export const DataContext = ({ children }: { children: React.ReactNode }) => {
    const [allPosts, setAllPosts] = useState({})
    const [finalList, setFinalList] = useState<finalListInterface[]>([])
    const [dataLoading, setDataLoading] = useState<boolean>(false)
    const [autoDownload, setAutoDownload] = useState<boolean>(false)
    const [localStored, setLocalStored] = useState<localStoredInterface>({
        currentUsername: '',
        currentId: '',
        nextToken: '',
        finalListPosts: [],
        totalVideos: 0,
        totalPictures: 0
    })
    
    const [advanceToggle, setAdvanceToggle] = useState<boolean>(false)
    const [twitterUsername, setTwitterUsername] = useState<string>('official_izone')
    const [nextToken2, setNextToken2] = useState<string>('')
    const [twitterId, setTwitterId] = useState<string>('')
    
    const [totalPictures, setTotalPictures] = useState<number>(0)
    const [totalVideos, setTotalVideos] = useState<number>(0)
    const [restored, setRestored] = useState<boolean>(false)

    const providerValues: providerValuesInterface | null = { restored, setRestored, totalPictures, setTotalPictures, totalVideos, setTotalVideos, twitterId, setTwitterId, twitterUsername, setTwitterUsername, nextToken2, setNextToken2, allPosts, setAllPosts, finalList, setFinalList, dataLoading, setDataLoading , autoDownload, setAutoDownload, advanceToggle, setAdvanceToggle, localStored, setLocalStored }

    useEffect(() => {
        const stored = localStorage.getItem('mlv')

        if (stored){
            setLocalStored(JSON.parse(stored))
        } else {
            localStorage.setItem('mlv', JSON.stringify(localStored))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('mlv', JSON.stringify(localStored))
    }, [localStored])

    return (
        <DataPostContext.Provider value={providerValues}>
            {children}
        </DataPostContext.Provider>
    )
}

export const useData = () => {
    return useContext<providerValuesInterface | null>(DataPostContext)
}

