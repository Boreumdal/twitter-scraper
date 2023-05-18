'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { EntitiesUrlInterface, MediaInterface, TweetInterface, AuthorNameInterface, FinalListInterface, ProviderValuesInterface } from '../../types/all'
import { RingLoader } from 'react-spinners'
import { saveAs } from 'file-saver'
import { FaSadTear, FaLink, FaGlobeAsia } from 'react-icons/fa'
import { useData } from '@context/DataContext'

const TwitterDisplay = () => {
    const [switcher, setSwitcher] = useState(false)
    const { systemState, updateSystemState, setDownloadedPhotoLinks } = useData() as ProviderValuesInterface
    
    const handleDownload = (link: string) => {
        saveAs(link + '?format=jpg&name=4096x4096', link.match(/media\/(.*)/)![1])
    }

    useEffect(() => {
        if (systemState.allPosts.posts){
            let temporaryArr: any[] = []

            systemState.allPosts.posts?.data.map((post: TweetInterface) => {
                let newList: FinalListInterface = {
                    id: post.id,
                    author_id: post.author_id,
                    created_at: post.created_at,
                    lang: post.lang,
                    text: post.text,
                    links: [],
                    images: [],
                    author_name: systemState.allPosts.posts?.includes.users?.filter((user: AuthorNameInterface) => user.id === post.author_id)[0] as AuthorNameInterface
                }

                let temp: string[] = []
                let temp2: string[] = []

                post?.attachments?.media_keys?.forEach((key: string) => {
                    systemState.allPosts.posts?.includes.media?.forEach((attach: MediaInterface) => {
                        if (attach.type === 'photo' && attach.media_key === key){
                            temp.push(`collection/media/${attach.url.match(/media\/(.*)/)![1]}`)
                        }
                        if (attach.type === 'video' && attach.media_key === key){
                            post.entities?.urls?.map((url: EntitiesUrlInterface) => {
                                if (url.media_key === key){
                                    temp.push(`collection/media/${url.url.match(/t.co\/(.*)/)![1]}.mp4`)
                                }
                            })
                        }
                        if (attach.type === 'animated_gif' && attach.media_key === key){
                            post.entities?.urls?.map((url: EntitiesUrlInterface) => {
                                if (url.media_key === key){
                                    temp.push(`collection/media/${url.url.match(/t.co\/(.*)/)![1]}.gif`)
                                }
                            })
                        }
                    })
                })

                post.entities?.urls?.map((url: EntitiesUrlInterface) => {
                    temp2.push(url?.expanded_url)
                })

                newList['images'] = temp
                newList['links'] = temp2

                if (post.referenced_tweets){
                    newList['referenced_tweets'] = post.referenced_tweets
                }
                if (post.in_reply_to_user_id){
                    newList['referenced_tweets'] = post.in_reply_to_user_id
                }

                temporaryArr.push(newList)
            })
            
            updateSystemState({
                finalList: [...systemState.finalList, ...temporaryArr],
                dataLoading: false,
                asd: systemState.asd + 1
            })
            
            systemState.allPosts.posts?.includes.media?.forEach((attach: MediaInterface) => {
                if (attach.type === 'photo' && systemState.autoDownload){
                    handleDownload(attach.url)
                    setDownloadedPhotoLinks(prev => [...prev, attach.url])
                }
            })
        }
    }, [systemState.allPosts])

    useEffect(() => {
        if (switcher){
            updateSystemState({
                localStored: {
                    ...systemState.localStored,
                    finalListPosts: systemState.finalList
                }
            })
        } else {
            setSwitcher(true)
        }
        
    }, [systemState.finalList])

    const handleVideoCopy = (link: string) => {
        if (link.includes('video')){
            let data = link.split('video')[0]
            navigator.clipboard.writeText(data)
        }
        if (link.includes('photo')){
            let data = link.split('photo')[0]
            navigator.clipboard.writeText(data)
        }
    }

    const handleCopy = (str: string) => {
        navigator.clipboard.writeText(str)
    }

    return (
        <div className='flex flex-col gap-2 h-full'>
            {!systemState.allPosts.posts && !systemState.dataLoading && <p className='flex items-center gap-2 font-medium py-1'><FaSadTear /><span>No fetched data found</span></p>}

            {systemState.dataLoading 
                ? (
                    <div className='h-full w-full grid place-items-center'>
                        <div className='flex flex-col items-center gap-2 justify-center'>
                            <RingLoader color="#fff" />
                            <p className='text-sm text-medium opacity-60'>Loading</p>
                        </div>
                    </div>
                )
                : systemState.allPosts.posts?.data.map((post: TweetInterface, idx: number) => (
                <div key={idx} className='bg-[#171717] p-4 flex flex-col sm:grid sm:grid-cols-2 gap-2'>
                    <div>
                        <p className='whitespace-pre-line'>{post.text}</p>
                    </div>
                    <div className='grid grid-cols-2 gap-2'>
                        {
                            post?.attachments?.media_keys?.map((key: string) => {
                                return systemState.allPosts.posts?.includes.media?.map((attach: MediaInterface) => {
                                    if (attach.type === 'photo' && attach.media_key === key){
                                        return (
                                            <div key={attach.media_key} onClick={() => handleDownload(attach.url)} className='cursor-pointer hover:opacity-90 w-fit h-fit'>
                                                <Image src={attach.url} width={400} height={60} alt='Picture' className='w-full aspect-auto' />
                                            </div>
                                        )
                                    }
                                    if (attach.type === 'video' && attach.media_key === key){
                                        return post.entities?.urls?.map((url: EntitiesUrlInterface) => {
                                            if (url.media_key === key){
                                                return (
                                                    <div key={key} className='grid grid-cols-2 h-[38px] items-center bg-[#ffffff15] border-l-4 border-transparent border-l-[#DF2E38] pr-2'>
                                                        <div className=''>
                                                            <span onClick={() => handleCopy(url.url.match(/t.co\/(.*)/)![1])} className='cursor-pointer text-sm font-medium truncate hover:bg-[#ffffff3b] ml-1 px-1'>ID: {url.url.match(/t.co\/(.*)/)![1]}</span>
                                                        </div>
                                                        <div className='flex items-center justify-end gap-2'>
                                                            <button onClick={() => handleVideoCopy(url.expanded_url)} className='text-xl'>
                                                                <FaLink />
                                                            </button>
                                                            <Link href='https://redketchup.io/twitter-downloader' target='_blank' className='text-xl'>
                                                                <FaGlobeAsia />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                    if (attach.type === 'animated_gif' && attach.media_key === key){
                                        return post.entities?.urls?.map((url: EntitiesUrlInterface) => {
                                            if (url.media_key === key){
                                                return (
                                                    <div key={key} className='grid grid-cols-2 h-[38px] items-center bg-[#ffffff15] border-l-4 border-transparent border-l-[#2e78df] pr-2'>
                                                        <div className=''>
                                                            <span onClick={() => handleCopy(url.url.match(/t.co\/(.*)/)![1])} className='cursor-pointer text-sm font-medium truncate hover:bg-[#ffffff3b] ml-1 px-1'>ID: {url.url.match(/t.co\/(.*)/)![1]}</span>
                                                        </div>
                                                        <div className='flex items-center justify-end gap-2'>
                                                            <button onClick={() => handleVideoCopy(url.expanded_url!)} className='text-xl'>
                                                                <FaLink />
                                                            </button>
                                                            <Link href='https://redketchup.io/twitter-downloader' target='_blank' className='text-xl'>
                                                                <FaGlobeAsia />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })
                                        
                                    }
                                })
                            })
                        }
                    </div>
                </div>)
            )}
        </div>
    )
}

export default TwitterDisplay


