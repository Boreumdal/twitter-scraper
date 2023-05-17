'use client'

import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import { ProviderValuesInterface, CurrentAccountInterface, CrawlerStateInterface, TweetInterface, ReferenceTweetInterface, MediaInterface } from '../../types/all'
import { useData } from '@context/DataContext'
import { FaRegTrashAlt, FaKey, FaServer } from 'react-icons/fa'
import { PulseLoader } from 'react-spinners'
import LineDivider from './components/LineDivider'
import Button from '../components/Button'
import ButtonSquare from './components/ButtonSquare'
import DataStatusContainer from './components/DataStatusContainer'
import ProfileInformation from './components/ProfileInformation'
import IndentityForm from './components/IndentityForm'

const origin = process.env.NEXT_PUBLIC_DEVELOPMENT_ENV === 'production' ? process.env.NEXT_PUBLIC_MAIN_URL : 'http://localhost:3000'

const TwitterIdCrawler = () => {

    const [currentAccount, setCurrentAccount] = useState<CurrentAccountInterface>({
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
    const [state, updateState] = useReducer((prev: CrawlerStateInterface, next: any): CrawlerStateInterface => {
        return {...prev, ...next}
    }, {
        loading: false,
        loading2: false,
        nextToken: '',
        listOfId: 'NA',
        bearer: 'AAAAAAAAAAAAAAAAAAAAAPhDjAEAAAAAD5PuEFs0Dr7VCneL6fX%2BxYMbdN8%3DocnGW2z8aelSXKlt9D3ln3UGLyViRmgPRm17l1mdaXjDA2HvK8', // will be deleted after final build
        maximum: 10,
        switcher: false
    })

    const { 
        systemState,
        updateSystemState,
        allPosts, 
        setAllPosts, 
        finalList, 
        setFinalList,
        setAdvanceToggle,
    } = useData() as ProviderValuesInterface

    const handleCopy = (str: any) => {
        navigator.clipboard.writeText(JSON.stringify(str))
    }

    const handleReset = () => {
        updateState({ listOfId: 'NA', bearer: '', nextToken: '' })
        setAllPosts({})
        setFinalList([])
        setCurrentAccount({
            url: "",
            name: "",
            username: "",
            entities: {},
            verified: true,
            profile_image_url: "", 
            created_at: "", 
            id: "",
            description: ""
          })

        updateSystemState({
            totalPictures: 0,
            totalVideos: 0,
            twitterId: '',
            twitterUsername: 'official_izone'
        })

        updateState({
            localStored: {
                currentUsername: '',
                currentId: '',
                nextToken: '',
                finalListPosts: [],
                totalVideos: 0,
                totalPictures: 0
            }
        })
    }

    // USER
    const handleUsernameIdFetch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        updateState({ loading2: true })

        try {
            const response = await axios.post(`${origin}/api/twitter/user`, JSON.stringify({ username: systemState.twitterUsername, bearer: state.bearer }))

            if (response){
                updateSystemState({ twitterId: response.data.user_id.data.id })
                setCurrentAccount(response.data.user_id.data);
                
                updateState({ loading2: false })
            }
        } catch (error){
            console.log(error);
        }
    }

    const handleTwitterPostIdCrawler = async () => {
        updateState({ loading: true })
        updateSystemState({ dataLoading: true })

        try {
            const response = await axios.post(`${origin}/api/twitter/ids`, JSON.stringify({ id: systemState.twitterId, nextToken: systemState.nextToken2 ? systemState.nextToken2 : state.nextToken, bearer: state.bearer, maximum: state.maximum < 5 || state.maximum > 100 ? 5 : state.maximum }))
            
            if (response){
                let postIds = response.data.posts.data.map((post: TweetInterface) => {
                    if (!post.referenced_tweets){
                        return post.id
                    }

                    if (post.referenced_tweets.some((item: ReferenceTweetInterface) => item.type === 'retweeted')){
                        return post.referenced_tweets.find((item: ReferenceTweetInterface )=> item.type === 'retweeted')!.id
                    }

                    return post.id
                })
                
                const tokenAndId = {
                    nextToken: response.data.posts.meta.next_token ? response.data.posts.meta.next_token : 'Last',
                    listOfId: postIds.join(',')
                }

                if (systemState.isRestore){
                    updateSystemState({ nextToken2: '' })
                    updateSystemState({ isRestore: false })
                    updateState({ ...tokenAndId })
                } else {
                    updateState({ ...tokenAndId })
                }
            }
        } catch (error){
            console.log(error);
            setAllPosts(prev => prev)
            updateState({ loading: false })
            updateSystemState({ dataLoading: false })
        }
    }

    useEffect(() => {
        const fetchHundredPosts = async () => {
            if (state.nextToken){
                const response = await axios.post(`${origin}/api/twitter/posts`, { ids: state.listOfId, bearer: state.bearer })

                if (response){
                    updateSystemState({
                        localStored: {
                            ...systemState.localStored,
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
            updateSystemState({totalPictures:  systemState.totalPictures + allPosts.posts?.includes.media?.filter((attach: MediaInterface) => attach.type === 'photo').length!})
            updateSystemState({
                totalPictures:  systemState.totalPictures + allPosts.posts?.includes.media?.filter((attach: MediaInterface) => attach.type === 'photo').length!,
                totalVideos:  systemState.totalVideos + allPosts.posts?.includes.media?.filter((attach: MediaInterface) => attach.type === 'video').length!
            })
        }
        
        
    }, [allPosts])

    useEffect(() => {
        if (state.switcher){
            updateSystemState({
                localStored: {
                    ...systemState.localStored,
                    totalVideos: systemState.totalVideos,
                    totalPictures: systemState.totalPictures
                }
            })
        } else {
            updateState({ switcher:true })
        }

    }, [systemState.totalVideos, systemState.totalPictures])

    return (
        <>
            {systemState.twitterId && <div className='absolute block sm:hidden h-fit bottom-3 left-3'>
                <Button type='button' click={handleTwitterPostIdCrawler} custom='bg-[#4D96FF]' disable={state.loading || !systemState.twitterId || state.nextToken === 'Last'} text={state.loading ? <PulseLoader size={5} color="#fff" /> : state.nextToken ? 'Next' : 'Fetch'} />
            </div>}

            <div className={(systemState.mobileNav ? 'flex' : 'hidden') + ' relative flex-col w-full h-full z-10'}>
                <div className='bg-[#171717] p-4 flex flex-col justify-between h-full overflow-auto mx-2 mb-2 my-0 sm:m-0 text-base'>
                    <IndentityForm updateSystemState={updateSystemState} handleUsernameIdFetch={handleUsernameIdFetch} username={systemState.twitterUsername} state={state} updateState={updateState} />
                    <LineDivider />
                    <button onClick={() => console.log(systemState)}>asdasd</button>
                    <ProfileInformation currentAccount={currentAccount} />
                    <LineDivider />
                    <div className='grid grid-cols-2 gap-2 justify-between'>
                        <div>
                            <h1 className='block font-medium pb-1'>Setting</h1>
                            <div className='flex flex-col gap-2'>
                                <div className='grid grid-cols-2 items-center h-[32px] gap-2 sm:gap-1'>
                                    <p className='text-xs opacity-50'>Auto Download</p>
                                    <div>
                                        <input type="checkbox" checked={systemState.autoDownload} onChange={e => updateSystemState({ autoDownload: e.target.checked })} />
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 items-center gap-2 h-[32px] sm:gap-1'>
                                    <p className='text-xs opacity-50'>Max Result</p>
                                    <div className='h-full'>
                                        <input type="number" value={state.maximum} onChange={e => updateState({ maximum: +e.target.value })} className='w-full bg-[#ffffff15] h-full px-2 rounded' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h1 className='block font-medium pb-1'>Actions</h1>
                            <div className='flex flex-col gap-2'>
                                <div className='flex gap-2 justify-between'>
                                    <div className='flex gap-2'>
                                        <Button type='button' click={handleTwitterPostIdCrawler} custom='bg-[#4D96FF]' disable={state.loading || !systemState.twitterId || state.nextToken === 'Last'} text={state.loading ? <PulseLoader size={5} color="#fff" /> : state.nextToken ? 'Next' : 'Fetch'} />
                                        {systemState.localStored && <ButtonSquare type='button' clickSync={() => setAdvanceToggle(prev => !prev)} custom='bg-[#4D96FF]' disable={!systemState.localStored.currentUsername} text={<FaServer />} />}
                                    </div>
                                    
                                    <ButtonSquare type='button' clickSync={handleReset} custom='bg-[#DF2E38]' disable={state.loading || !state.nextToken} text={<FaRegTrashAlt />} />
                                </div>
                                <div className='flex items-center h-[32px] bg-[#ffffff15] rounded'>
                                    <p className='h-full aspect-square grid place-items-center rounded'><FaKey /></p>
                                    <input type="text" className='block w-full h-full bg-transparent text-xs sm:text-sm outline-none text-white rounded disabled:opacity-75' value={systemState.nextToken2 ? systemState.nextToken2 : state.nextToken} onChange={e => updateSystemState({ nextToken2: e.target.value })} placeholder='Continuation token' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <LineDivider />
                    <DataStatusContainer allPosts={allPosts} finalList={finalList} handleCopy={handleCopy} totalPictures={systemState.totalPictures} totalVideos={systemState.totalVideos} />
                </div>
            </div>
        </>
    )
}

export default TwitterIdCrawler