'use client'

import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useReducer, useState } from 'react'
import { providerValuesInterface, currentAccountInterface } from '../../types/all'
import { useData } from '@context/DataContext'
import { FaRegCopy, FaRegTrashAlt, FaKey, FaServer } from 'react-icons/fa'
import { PulseLoader } from 'react-spinners'
import DataStatus from './components/DataStatus'
import LineDivider from './components/LineDivider'
import Button from './components/Button'
import ButtonSquare from './components/ButtonSquare'
import DataStatusContainer from './components/DataStatusContainer'
import ProfileInformation from './components/ProfileInformation'

interface CrawlerStateInterface {
    loading: boolean
    loading2: boolean
    nextToken: string
}

const TwitterIdCrawler = () => {
    const [currentAccount, setCurrentAccount] = useState<currentAccountInterface>({
        url: '',
        name: '',
        username: '',
        entities: {},
        verified: true,
        profile_image_url: '',
        created_at: '',
        id: '',
        description: ''
    })
    const [state, updateState] = useReducer((prev: CrawlerStateInterface, next: any) => {
        return {...prev, ...next}
    }, {
        loading: false,
        loading2: false,
        nextToken: '',
        listOfId: 'NA'
    })
    const [bearer, setBearer] = useState('AAAAAAAAAAAAAAAAAAAAAPhDjAEAAAAAD5PuEFs0Dr7VCneL6fX%2BxYMbdN8%3DocnGW2z8aelSXKlt9D3ln3UGLyViRmgPRm17l1mdaXjDA2HvK8')
    const [maximum, setMaximum] = useState(10)
    const [switcher, setSwitcher] = useState(false)

    const { 
        restored, 
        setRestored, 
        totalPictures, 
        setTotalPictures, 
        totalVideos, 
        setTotalVideos, 
        twitterId, 
        setTwitterId, 
        twitterUsername, 
        setTwitterUsername, 
        nextToken2, 
        setNextToken2, 
        allPosts, 
        setAllPosts, 
        finalList, 
        setFinalList, 
        setDataLoading, 
        autoDownload, 
        setAutoDownload, 
        setAdvanceToggle, 
        localStored, 
        setLocalStored 
    } = useData() as providerValuesInterface

    const handleCopy = (str: any) => {
        navigator.clipboard.writeText(JSON.stringify(str))
    }

    const handleReset = () => {
        setTwitterId('')
        updateState({ listOfId: 'NA' })
        updateState({ nextToken: '' })
        setAllPosts({})
        setFinalList([])
        setBearer('')
        setTwitterUsername('')
        setCurrentAccount({
            url: "https://t.co/1cOni3oayK",
            name: "official_IZONE",
            username: "official_izone",
            entities: {},
            verified: true,
            profile_image_url: "https://pbs.twimg.com/profile_images/1335600379090759681/Az89GwTv_normal.jpg", // will be deleted and regenerated after final build
            created_at: "2018-08-29T10:09:00.000Z", 
            id: "1034744720537219073",
            description: "IZ*ONE(아이즈원) OFFICIAL TWITTER"
          })
        setTotalPictures(0)
        setTotalVideos(0)
        setLocalStored({
            currentUsername: '',
            currentId: '',
            nextToken: '',
            finalListPosts: [],
            totalVideos: 0,
            totalPictures: 0
        })
    }

    const handleUsernameIdFetch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        updateState({ loading2: true })

        try {
            const response = await axios.post(`http://localhost:3000/api/twitter/user`, JSON.stringify({ username: twitterUsername, bearer }))

            if (response){
                setTwitterId(response.data.user_id.data.id);
                setCurrentAccount(response.data.user_id.data);
                
                updateState({ loading2: false })
            }
        } catch (error){
            console.log(error);
        }

    }

    const handleTwitterPostIdCrawler = async () => {
        updateState({ loading: true })
        setDataLoading(true)

        try {
            const response = await axios.post('http://localhost:3000/api/twitter/ids', JSON.stringify({ id: twitterId, nextToken: nextToken2 ? nextToken2 : state.nextToken, bearer, maximum: maximum < 5 || maximum > 100 ? 5 : maximum }))
            
            if (response){
                let postIds = response.data.posts.data.map((post: any) => {
                    if (!post.referenced_tweets){
                        return post.id
                    }

                    if (post.referenced_tweets.some((item: any) => item.type === 'retweeted')){
                        return post.referenced_tweets.find((item: any )=> item.type === 'retweeted').id
                    }

                    return post.id
                })
                
                

                if (restored){
                    setNextToken2('')
                    setRestored(false)
                    updateState({ nextToken: response.data.posts.meta.next_token ? response.data.posts.meta.next_token : 'Last' })
                    updateState({ listOfId: postIds.join(',') })
                } else {
                    updateState({ nextToken: response.data.posts.meta.next_token ? response.data.posts.meta.next_token : 'Last' })
                    updateState({ listOfId: postIds.join(',') })
                }
            }
        } catch (error){
            console.log(error);
            setAllPosts(prev => prev)
            updateState({ loading: false })
            setDataLoading(false)
        }
    }

    useEffect(() => {
        const fetchHundredPosts = async () => {
            if (state.nextToken){
                const response = await axios.post(`http://localhost:3000/api/twitter/posts`, { ids: state.listOfId, bearer })

                if (response){
                    setLocalStored(prev => {
                        return {
                            ...prev,
                            nextToken: state.nextToken,
                            currentUsername: currentAccount.username,
                            currentId: currentAccount.id
                        }
                    })

                    setAllPosts(response.data)
                    updateState({ loading: false })
                }
            }
        }

        fetchHundredPosts()
        
    }, [state.nextToken])

    useEffect(() => {
        if (allPosts.posts){
            setTotalPictures(prev => {
                return prev + allPosts.posts?.includes.media?.filter((attach: any) => attach.type === 'photo').length!
            })

            setTotalVideos(prev => {
                return prev + allPosts.posts?.includes.media?.filter((attach: any) => attach.type === 'video').length!
            })
            
        }
        
        
    }, [allPosts])

    useEffect(() => {
        if (switcher){
            setLocalStored(prev => {
                return {
                    ...prev,
                    totalVideos: totalVideos,
                    totalPictures: totalPictures
                }
            })
        } else {
            setSwitcher(true)
        }

    }, [totalVideos, totalPictures])

    return (
        <div className='bg-[#171717] p-4 flex flex-col justify-between h-full overflow-auto'>
            <form onSubmit={handleUsernameIdFetch} className='flex flex-col gap-2'>
                <div className='flex flex-col gap-1'>
                    <div className='flex flex-col justify-center gap-1'>
                        <label htmlFor='username' className='block font-medium'>Username</label>
                        <input type="text" id='username' className='block w-full h-[35px] bg-[#ffffff15] text-sm outline-none text-white px-2 rounded disabled:opacity-75' value={twitterUsername} onChange={e => setTwitterUsername(e.target.value)} placeholder='Twitter ID' disabled={state.nextToken ? true : false} required />
                    </div>
                    <div className='flex flex-col justify-center gap-1'>
                        <label htmlFor='bearerToken' className='block font-medium'>Bearer Token</label>
                        <input type="text" id='bearerToken' className='block w-full h-[35px] bg-[#ffffff15] text-sm outline-none text-white px-2 rounded disabled:opacity-75' value={bearer} onChange={e => setBearer(e.target.value)} placeholder='Bearer Token' disabled={state.nextToken ? true : false} required />
                    </div>
                </div>

                <div className='flex justify-end items-center'>
                    <Button type='submit' custom='bg-[#61B15A]' disable={!twitterUsername || !bearer} text={state.loading2 ? <PulseLoader size={5} color="#fff" /> : 'Get User'} />
                </div>
            </form>
            <LineDivider />
            <ProfileInformation currentAccount={currentAccount} />
            <LineDivider />
            <div className='grid grid-cols-2 gap-2'>
                <div>
                    <h1 className='block font-medium pb-1'>Setting</h1>
                    <div className='flex flex-col gap-2'>
                        <div className='grid grid-cols-2 items-center h-[32px]'>
                            <p className='text-xs opacity-50'>Auto Download</p>
                            <div>
                                <input type="checkbox" checked={autoDownload} onChange={e => setAutoDownload(e.target.checked)} />
                            </div>
                        </div>
                        <div className='grid grid-cols-2 items-center h-[32px]'>
                            <p className='text-xs opacity-50'>Max Result</p>
                            <div className='h-full'>
                                <input type="number" value={maximum} onChange={e => setMaximum(+e.target.value)} className='w-full bg-[#ffffff15] h-full px-2 rounded' />
                            </div>
                        </div>
                    </div>

                </div>
                <div>
                    <h1 className='block font-medium pb-1'>Actions</h1>
                    <div className='flex flex-col gap-2'>
                        <div className='flex gap-2 justify-between'>
                            <div className='flex gap-2'>
                                <Button type='button' click={handleTwitterPostIdCrawler} custom='bg-[#4D96FF]' disable={state.loading || !twitterId || state.nextToken === 'Last'} text={state.loading ? <PulseLoader size={5} color="#fff" /> : state.nextToken ? 'Next' : 'Fetch'} />
                                {localStored && <ButtonSquare type='button' clickSync={() => setAdvanceToggle(prev => !prev)} custom='bg-[#4D96FF]' disable={!localStored.currentUsername} text={<FaServer />} />}
                            </div>
                            
                            <ButtonSquare type='button' clickSync={handleReset} custom='bg-[#DF2E38]' disable={state.loading || !state.nextToken} text={<FaRegTrashAlt />} />
                        </div>
                        <div className='flex items-center h-[32px] bg-[#ffffff15] rounded'>
                            <p className='h-full aspect-square grid place-items-center rounded'><FaKey /></p>
                            <input type="text" className='block w-full h-full bg-transparent text-sm outline-none text-white rounded disabled:opacity-75' value={nextToken2 ? nextToken2 : state.nextToken} onChange={e => setNextToken2(e.target.value)} placeholder='Continuation token' />
                        </div>
                    </div>
                </div>
            </div>
            <LineDivider />
            <DataStatusContainer allPosts={allPosts} finalList={finalList} handleCopy={handleCopy} totalPictures={totalPictures} totalVideos={totalVideos} />
        </div>
    )
}

export default TwitterIdCrawler