'use client'

import { providerValuesInterface, useData } from '@context/DataContext'
import React from 'react'

const AdvanceSettings = () => {
    const { setRestored, totalPictures, setTotalPictures, totalVideos, setTotalVideos, twitterId, setTwitterId, twitterUsername, setTwitterUsername, setNextToken2, advanceToggle, setAdvanceToggle, localStored, setFinalList } = useData() as providerValuesInterface

    const handleRestore = () => {
        setTwitterUsername(localStored.currentUsername)
        setNextToken2(localStored.nextToken)
        setFinalList(localStored.finalListPosts)
        setTotalVideos(localStored.totalVideos)
        setTotalPictures(localStored.totalPictures)
        setRestored(true)
        setAdvanceToggle(false)
    }

    return advanceToggle && (
        <div className='absolute inset-0 bg-[#33333383] text-white grid place-items-center'>
            <div className='w-[400px] bg-[#171717] shadow py-2'>
                <h1 className='text-2xl font-bold py-2 mx-4 border-b border-[#363636]'>Advance Option</h1>
                <div className='px-6 py-2'>
                    <h1 className='font-medium'>Restore Previous Data</h1>
                    <div className='flex flex-col gap-1 px-1 pt-1 pb-2'>
                        <h1 className=''>Information</h1>
                        <div className='flex flex-col gap-2 p-3 bg-[#ffffff15] text-white'>
                            <div className='grid grid-cols-2 items-center'>
                                <p className='text-sm font-bold'>Username</p>
                                <p className='opacity-50 font-medium truncate'>{localStored.currentUsername}</p>
                            </div>
                            <div className='grid grid-cols-2 items-center'>
                                <p className='text-sm font-bold'>Current ID</p>
                                <p className='opacity-50 font-medium truncate'>{localStored.currentId}</p>
                            </div>
                            <div className='grid grid-cols-2 items-center'>
                                <p className='text-sm font-bold'>Next Token</p>
                                <p className='opacity-50 font-medium truncate'>{localStored.nextToken}</p>
                            </div>
                        </div>
                        <h1 className=''>Status</h1>
                        <div className='flex flex-col gap-2 p-3 bg-[#ffffff15] text-white'>
                            <div className='grid grid-cols-2'>
                                <div>
                                    <h3 className='text-sm font-bold'>Overall Data Collected:</h3>
                                    <p className='text-lg opacity-50 font-medium'>{localStored.finalListPosts.length}</p>
                                </div>
                            </div>
                            <div className='grid grid-cols-2'>
                                <div>
                                    <h3 className='text-sm font-bold'>Total Pictures Fetched:</h3>
                                    <p className='text-lg opacity-50 font-medium'>{localStored.totalPictures}</p>
                                </div>
                                <div>
                                    <h3 className='text-sm font-bold'>Total Videos Fetched:</h3>
                                    <p className='text-lg opacity-50 font-medium'>{localStored.totalVideos}</p>
                                </div>
                            </div>
                            <div className=''>
                                <div>
                                    <h3 className='text-sm font-bold'>Total Media Fetched:</h3>
                                    <p className='text-lg opacity-50 font-medium'>{+localStored.totalPictures + +localStored.totalVideos}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='mt-2 flex justify-end px-1 gap-2'>
                        <button onClick={() => setAdvanceToggle(false)} className='text-sm h-[32px] mx-5 bg-transparent text-white font-medium rounded disabled:opacity-75'>Cancel</button>
                        <button onClick={handleRestore} className='text-sm h-[32px] w-[90px] bg-[#4D96FF] text-white font-medium rounded disabled:opacity-75'>Restore</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdvanceSettings