'use client'

import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { FinalListInterface, LocalStoredInterface, PostsDataInterface, ProviderValuesInterface } from '../types/all'

const DataPostContext = createContext<ProviderValuesInterface | null>(null)

export const DataContext = ({ children }: { children: React.ReactNode }) => {
    const [allPosts, setAllPosts] = useState<PostsDataInterface>({})
    const [finalList, setFinalList] = useState<FinalListInterface[]>([])
    const [dataLoading, setDataLoading] = useState<boolean>(false)
    const [autoDownload, setAutoDownload] = useState<boolean>(false)
    const [localStored, setLocalStored] = useState<LocalStoredInterface>({
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
    const [isRestore, setIsRestore] = useState<boolean>(false)
    const [mobileNav, setMobileNav] = useState<boolean>(true)
    const [downloadedPhotoLinks, setDownloadedPhotoLinks] = useState<string[]>([])

    // const [systemState, updateSystemState] = useReducer((prev: any, next: any) => {
    //     return {...prev, ...next}
    // }, {
        
    // })

    const providerValues: ProviderValuesInterface | null = { totalPictures, setTotalPictures, totalVideos, downloadedPhotoLinks, setDownloadedPhotoLinks, setTotalVideos, twitterId, setTwitterId, twitterUsername, setTwitterUsername, nextToken2, setNextToken2, allPosts, setAllPosts, finalList, setFinalList, dataLoading, setDataLoading , autoDownload, setAutoDownload, advanceToggle, setAdvanceToggle, localStored, setLocalStored, isRestore, setIsRestore, mobileNav, setMobileNav }

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
    return useContext<ProviderValuesInterface | null>(DataPostContext)
}

