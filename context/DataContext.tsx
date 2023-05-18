'use client'

import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { ProviderValuesInterface, SystemStateInterface } from '../types/all'

const DataPostContext = createContext<ProviderValuesInterface | null>(null)

export const DataContext = ({ children }: { children: React.ReactNode }) => {
    const [systemState, updateSystemState] = useReducer((prev: any, next: any): SystemStateInterface => {
        return {...prev, ...next}
    }, {
        totalPictures: 0,
        totalVideos: 0,
        twitterId: '',
        twitterUsername: 'minju_official_',
        autoDownload: false,
        nextToken2: '',
        isRestore: false,
        localStored: {
            currentUsername: '',
            currentId: '',
            nextToken: '',
            finalListPosts: [],
            totalVideos: 0,
            totalPictures: 0
        },
        dataLoading: false,
        mobileNav: true,
        advanceToggle: false,
        finalList: [],
        downloadedPhotoLinks: [],
        allPosts: {}
    })

    const providerValues: ProviderValuesInterface | null = { systemState, updateSystemState }

    useEffect(() => {
        const stored = localStorage.getItem('mlv')

        if (stored){
            updateSystemState({ localStored: {...JSON.parse(stored)}})
        } else {
            localStorage.setItem('mlv', JSON.stringify(systemState.localStored))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('mlv', JSON.stringify(systemState.localStored))
    }, [systemState.localStored])

    return (
        <DataPostContext.Provider value={providerValues}>
            {children}
        </DataPostContext.Provider>
    )
}

export const useData = () => {
    return useContext<ProviderValuesInterface | null>(DataPostContext)
}

