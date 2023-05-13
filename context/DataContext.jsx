'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

const DataPostContext = createContext(null)

export const DataContext = ({ children }) => {
    const [allPosts, setAllPosts] = useState({})
    const [finalList, setFinalList] = useState([])
    const [dataLoading, setDataLoading] = useState(false)
    const [autoDownload, setAutoDownload] = useState(false)
    const [localStored, setLocalStored] = useState({
        currentUsername: '',
        currentId: '',
        nextToken: '',
        finalListPosts: [],
        totalVideos: 0,
        totalPictures: 0
    })
    
    const [advanceToggle, setAdvanceToggle] = useState(false)
    const [twitterUsername, setTwitterUsername] = useState('official_izone')
    const [nextToken2, setNextToken2] = useState('')
    const [twitterId, setTwitterId] = useState('')
    
    const [totalPictures, setTotalPictures] = useState(0)
    const [totalVideos, setTotalVideos] = useState(0)
    const [restored, setRestored] = useState(false)

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
        <DataPostContext.Provider value={{ restored, setRestored, totalPictures, setTotalPictures, totalVideos, setTotalVideos, twitterId, setTwitterId, twitterUsername, setTwitterUsername, nextToken2, setNextToken2, allPosts, setAllPosts, finalList, setFinalList, dataLoading, setDataLoading ,autoDownload, setAutoDownload, advanceToggle, setAdvanceToggle, localStored, setLocalStored}}>
            {children}
        </DataPostContext.Provider>
    )
}

export const useData = () => {
    return useContext(DataPostContext)
}