'use client'

import { authorNameInterface, providerValuesInterface, useData } from '@context/DataContext'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FaRegCopy, FaRegTrashAlt, FaKey, FaServer } from 'react-icons/fa'
import { PulseLoader } from 'react-spinners'

interface currentAccountInterface {
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

const TwitterIdCrawler = () => {
    const [currentAccount, setCurrentAccount] = useState<currentAccountInterface>({
        url: "https://t.co/1cOni3oayK",
        name: "official_IZONE",
        username: "official_izone",
        entities: {
          url: {
            urls: [
              {
                start: 0,
                end: 23,
                url: "https://t.co/1cOni3oayK",
                expanded_url: "http://cafe.daum.net/official-izone",
                display_url: "cafe.daum.net/official-izone"
              }
            ]
          }
        },
        verified: true,
        profile_image_url: "https://pbs.twimg.com/profile_images/1335600379090759681/Az89GwTv_normal.jpg",
        created_at: "2018-08-29T10:09:00.000Z",
        id: "1034744720537219073",
        description: "IZ*ONE(아이즈원) OFFICIAL TWITTER"
      })
    const [listOfId, setListOfId] = useState('NA')
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [nextToken, setNextToken] = useState('')
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
        setListOfId('NA')
        setNextToken('')
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
            profile_image_url: "https://pbs.twimg.com/profile_images/1335600379090759681/Az89GwTv_normal.jpg",
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
        setLoading2(true)

        try {
            const response = await axios.post(`http://localhost:3000/api/twitter/user`, JSON.stringify({ username: twitterUsername, bearer }))

            if (response){
                setTwitterId(response.data.user_id.data.id);
                setCurrentAccount(response.data.user_id.data);
                
                setLoading2(false)
            }
        } catch (error){
            console.log(error);
        }

    }

    const handleTwitterPostIdCrawler = async () => {
        setLoading(true)
        setDataLoading(true)

        try {
            const response = await axios.post('http://localhost:3000/api/twitter/ids', JSON.stringify({ id: twitterId, nextToken: nextToken2 ? nextToken2 : nextToken, bearer, maximum: maximum < 5 || maximum > 100 ? 5 : maximum }))
            
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
                    setNextToken(response.data.posts.meta.next_token ? response.data.posts.meta.next_token : 'Last')
                    setListOfId(postIds.join(','))
                } else {
                    setNextToken(response.data.posts.meta.next_token ? response.data.posts.meta.next_token : 'Last')
                    setListOfId(postIds.join(','))
                }
            }
        } catch (error){
            console.log(error);
            setAllPosts(prev => prev)
            setLoading(false)
            setDataLoading(false)
        }
    }

    useEffect(() => {
        const fetchHundredPosts = async () => {
            if (nextToken){

                const response = await axios.post(`http://localhost:3000/api/twitter/posts`, { ids: listOfId, bearer })

                if (response){
                    setLocalStored(prev => {
                        return {
                            ...prev,
                            nextToken,
                            currentUsername: currentAccount.username,
                            currentId: currentAccount.id
                        }
                    })
                    setLocalStored(prev => {
                        return {
                            ...prev,
                            nextToken,
                            currentUsername: currentAccount.username,
                            currentId: currentAccount.id,
                        }
                    })
                    setAllPosts(response.data)
                    setLoading(false)
                }
            }
        }

        fetchHundredPosts()
        
    }, [nextToken])

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
            <div>
                <div className='grid grid-cols-2 items-center justify-center pb-1'>
                    <label htmlFor='' className='block font-medium'>Username</label>
                </div>
                <div className='flex flex-col gap-1'>
                    <input type="text" className='block w-full h-[35px] bg-[#ffffff15] text-sm outline-none text-white px-2 rounded disabled:opacity-75' value={twitterUsername} onChange={e => setTwitterUsername(e.target.value)} placeholder='Twitter ID' disabled={nextToken ? true : false} required />
                </div>
                <div className='grid grid-cols-2 items-center justify-center py-1'>
                    <label htmlFor='' className='block font-medium'>Bearer Token</label>
                </div>
                <div className='flex flex-col gap-1'>
                    <input type="text" className='block w-full h-[35px] bg-[#ffffff15] text-sm outline-none text-white px-2 rounded disabled:opacity-75' value={bearer} onChange={e => setBearer(e.target.value)} placeholder='Bearer Token' disabled={nextToken ? true : false} required />
                </div>
            </div>
            <div className='flex justify-end items-center'>
                <div className='flex gap-2'>
                    <button type='submit' className='text-sm h-[32px] w-[90px] bg-[#61B15A] text-white hover: font-medium rounded disabled:opacity-75' disabled={!twitterUsername || !bearer}>{loading2 ? <PulseLoader size={5} color="#fff" /> : 'Get User'}</button>
                </div>
            </div>
        </form>
<div className='h-[1px] w-full bg-white opacity-10'></div>
        <div className='flex flex-col gap-2'>
            <div>
                <div className='grid grid-cols-2 items-center justify-center pb-1'>
                    <h1 className='block font-medium'>Information</h1>
                </div>
                
                <div className='grid grid-cols-[60px_auto] h-[67px] gap-2 bg-[#ffffff15]'>
                    {currentAccount.id && <>
                        <div className='grid place-items-center'>
                            <Image src={currentAccount?.profile_image_url} alt='dp' height={54} width={54} className='object-cover aspect-square rounded-full' />
                        </div>
                        <div className='flex flex-col justify-center '>
                            <h1 className='font-bold'>{currentAccount?.name}</h1>
                            <p className='font-medium opacity-50 text-xs'>@{currentAccount?.username}</p>
                        </div>
                    </>}
                </div>
            </div>
        </div>
                        <div className='h-[1px] w-full bg-white opacity-10'></div>
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
                            <button type='button' onClick={handleTwitterPostIdCrawler} className='text-sm h-[32px] w-[90px] bg-[#4D96FF] text-white font-medium rounded disabled:opacity-50' disabled={loading || !twitterId || nextToken === 'Last'}>{loading ? <PulseLoader size={5} color="#fff" /> : nextToken ? 'Next' : 'Fetch'}</button>
                            {localStored && <button type='button' onClick={() => setAdvanceToggle(prev => !prev)} className='text-lg h-[32px] aspect-square bg-[#4D96FF] text-white font-medium rounded grid place-items-center disabled:opacity-50' disabled={!localStored.currentUsername}><FaServer /></button>}
                        </div>
                        <button type='button' onClick={handleReset} className='text-lg h-[32px] aspect-square bg-[#DF2E38] text-white font-medium rounded disabled:opacity-50 grid place-items-center' disabled={loading || !nextToken}><FaRegTrashAlt /></button>
                    </div>
                    <div className='flex items-center h-[32px] bg-[#ffffff15] rounded'>
                        <p className='h-full aspect-square grid place-items-center rounded'><FaKey /></p>
                        <input type="text" className='block w-full h-full bg-transparent text-sm outline-none text-white rounded disabled:opacity-75' value={nextToken2 ? nextToken2 : nextToken} onChange={e => setNextToken2(e.target.value)} placeholder='Continuation token' />
                    </div>
                </div>
            </div>
        </div>
<div className='h-[1px] w-full bg-white opacity-10'></div>
        <div>
            <h1 className='block font-medium pb-1'>Status</h1>
            <div className='flex flex-col gap-2 bg-[#ffffff15] p-3 text-white'>
                <div className='grid grid-cols-2'>
                    <div>
                        <h3 className='text-sm font-bold'>Overall Data Collected:</h3>
                        <p className='text-lg opacity-50 font-medium'>{finalList.length}</p>
                    </div>
                    <div className='flex justify-end'>
                        {finalList.length !== 0 && <button onClick={() => handleCopy(finalList)} className='text-xl h-fit'><FaRegCopy /></button>}
                    </div>
                </div>
                <div className='grid grid-cols-2'>
                    <div>
                        <h3 className='text-sm font-bold'>Videos Fetched:</h3>
                        <p className='text-lg opacity-50 font-medium'>{allPosts.posts ? allPosts?.posts?.includes?.media?.filter((attach: any) => attach.type === 'video').length : 0}</p>
                    </div>
                    <div>
                        <h3 className='text-sm font-bold'>Total Videos Fetched:</h3>
                        <p className='text-lg opacity-50 font-medium'>{totalVideos}</p>
                    </div>
                </div>
                <div className='grid grid-cols-2'>
                    <div>
                        <h3 className='text-sm font-bold'>Pictures Fetched:</h3>
                        <p className='text-lg opacity-50 font-medium'>{allPosts.posts ? allPosts?.posts?.includes?.media?.filter((attach: any) => attach.type === 'photo').length : 0}</p>
                    </div>
                    <div>
                        <h3 className='text-sm font-bold'>Total Pictures Fetched:</h3>
                        <p className='text-lg opacity-50 font-medium'>{totalPictures}</p>
                    </div>
                </div>
                <div className=''>
                    <div>
                        <h3 className='text-sm font-bold'>Total Media Fetched:</h3>
                        <p className='text-lg opacity-50 font-medium'>{totalPictures + totalVideos}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TwitterIdCrawler