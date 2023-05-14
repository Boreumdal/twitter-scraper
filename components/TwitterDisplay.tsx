'use client'

import { finalListInterface, providerValuesInterface, useData } from '@context/DataContext'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { RingLoader } from 'react-spinners'
import { saveAs } from 'file-saver'
import { FaSadTear, FaLink, FaGlobeAsia } from 'react-icons/fa'

const TwitterDisplay = () => {
    const [switcher, setSwitcher] = useState(false)
    const { allPosts, finalList, setFinalList, dataLoading, autoDownload, setDataLoading, localStored, setLocalStored } = useData() as providerValuesInterface
    
    const handleDownload = (link: string) => {
        saveAs(link + '?format=jpg&name=4096x4096', link.match(/media\/(.*)/)![1])
    }

    useEffect(() => {
        if (allPosts.posts){
            allPosts.posts?.data.map((post: any) => {
                let newList: finalListInterface = {
                    id: post.id,
                    author_id: post.author_id,
                    created_at: post.created_at,
                    lang: post.lang,
                    text: post.text,
                    images: [],
                    author_name: allPosts?.posts.includes.users.filter((user: any) => user.id === post.author_id)[0]
                }

                let temp: any [] = []

                post?.attachments?.media_keys?.forEach((key: any) => {
                    allPosts?.posts.includes.media.forEach((attach: any) => {
                        if (attach.type === 'photo' && attach.media_key === key){
                            temp.push(`collection/media/${attach.url.match(/media\/(.*)/)[1]}.jpg`)
                        }
                        if (attach.type === 'video' && attach.media_key === key){
                            post?.entities.urls.map((url: any) => {
                                if (url.media_key === key){
                                    temp.push(`collection/media/${url.url.match(/t.co\/(.*)/)[1]}.mp4`)
                                }
                            })
                            
                        }
                    })
                })

                newList['images'] = temp

                if (post.referenced_tweets){
                    newList['referenced_tweets'] = post.referenced_tweets
                }
                if (post.in_reply_to_user_id){
                    newList['referenced_tweets'] = post.in_reply_to_user_id
                }

                setFinalList(prev => {
                    return [...prev, newList]
                })
                
                setDataLoading(false)
                
            })

            allPosts?.posts?.includes.media.forEach((attach: any) => {
                if (attach.type === 'photo'){
                    if (autoDownload){
                        handleDownload(attach.url)
                    }
                }
            })
        }

    }, [allPosts])

    useEffect(() => {
        if (switcher){
            setLocalStored(prev => {
                return {
                    ...prev,
                    finalListPosts: finalList
                }
            })
        } else {
            setSwitcher(true)
        }
    }, [finalList])

    const handleVideoCopy = (link: any) => {
        if (link.includes('video')){
            let data = link.split('video')[0]
            navigator.clipboard.writeText(data)
        }
    }

    const handleCopy = (str: any) => {
        navigator.clipboard.writeText(typeof(str) === 'string' ? str : JSON.stringify(str))
    }

    return (
        <div className='flex flex-col gap-2 h-full'>
            {!allPosts.posts && !dataLoading && <p className='flex items-center gap-2 font-medium py-1'><FaSadTear /><span>No fetched data found</span></p>}

            {dataLoading 
                ? (
                    <div className='h-full w-full grid place-items-center'>
                        <div className='flex flex-col items-center gap-2 justify-center'>
                            <RingLoader color="#fff" />
                            <p className='text-sm text-medium opacity-60'>Loading</p>
                        </div>
                    </div>
                )
                : allPosts.posts?.data.map((post: any, idx: number) => (
                <div key={idx} className='bg-[#171717] p-4 grid grid-cols-2 gap-1'>
                    <div>
                        <p className='whitespace-pre-line'>{post.text}</p>
                    </div>
                    <div className='grid grid-cols-2 gap-2'>
                        {
                            post?.attachments?.media_keys?.map((key: any) => {
                                return allPosts.posts.includes.media.map((attach: any) => {
                                    if (attach.type === 'photo' && attach.media_key === key){
                                        return (
                                            <div key={attach.media_key} onClick={() => handleDownload(attach.url)} className='cursor-pointer hover:opacity-90 w-fit h-fit'>
                                                <Image src={attach.url} width={400} height={60} alt='Picture' className='w-full aspect-auto' />
                                            </div>
                                        )
                                    }
                                    if (attach.type === 'video' && attach.media_key === key){
                                        return post?.entities.urls.map((url: any) => {
                                            if (url.media_key === key){
                                                return (
                                                    <div key={key} className='grid grid-cols-2 h-[38px] items-center bg-[#ffffff15] border-l-4 border-transparent border-l-[#DF2E38] pr-2'>
                                                        <div className='cursor-pointer'>
                                                            <span onClick={() => handleCopy(url.url.match(/t.co\/(.*)/)[1])} className='text-sm font-medium truncate hover:bg-[#ffffff3b] ml-1 px-1'>ID: {url.url.match(/t.co\/(.*)/)[1]}</span>
                                                        </div>
                                                        <div className='flex items-center justify-end gap-2'>
                                                            <button onClick={() => handleVideoCopy(url.expanded_url)} className='text-xl'>
                                                                <FaLink />
                                                            </button>
                                                            <Link href='https://twdown.net/index.php' target='_blank' className='text-xl'>
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