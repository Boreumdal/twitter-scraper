'use client'

import React, { useState } from 'react'
import { providerValuesInterface } from '../../types/all'
import { useData } from '@context/DataContext'
import DataStatusContainer from './components/DataStatusContainer'
import DataAccountInfoContainer from './components/DataAccountInfoContainer'
import Button from '@components/components/Button'
import { MdFirstPage, MdLastPage } from 'react-icons/md'
import { RxCross2 } from 'react-icons/rx'

const AdvanceSettings = () => {
    const [page, setPage] = useState(1)
    const { setIsRestore, setTotalPictures, setTotalVideos, setTwitterUsername, setNextToken2, advanceToggle, downloadedPhotoLinks, setAdvanceToggle, localStored, setFinalList } = useData() as providerValuesInterface

    const handleRestore = () => {
        setTwitterUsername(localStored.currentUsername)
        setNextToken2(localStored.nextToken)
        setFinalList(localStored.finalListPosts)
        setTotalVideos(localStored.totalVideos)
        setTotalPictures(localStored.totalPictures)
        setIsRestore(true)
        setAdvanceToggle(false)
    }

    return advanceToggle ? (
        <div className='absolute inset-0 bg-[#33333383] text-white grid place-items-center px-2 z-50'>
            <div className='w-full sm:w-[400px] h-[530px] bg-[#171717] shadow py-2'>
                <div className='flex justify-between py-2 mx-4 border-b border-[#363636]'>
                    <h1 className='text-2xl font-bold '>Advance Option</h1>
                    <div className='flex items-center gap-2'>
                        {page === 2 && <button onClick={() => setPage(1)} className='text-xl'><MdFirstPage /></button>}
                        {page === 1 && <button onClick={() => setPage(2)} className='text-xl'><MdLastPage /></button>}
                        <button onClick={() => setAdvanceToggle(false)} className='text-2xl hover:text-red-500'><RxCross2 /></button>
                    </div>
                </div>
                {page === 1 && <div className=''>
                    <div className='px-6 py-2'>
                        <h1 className='font-medium'>Restore Previous Data</h1>
                        <div className='flex flex-col gap-1 px-1 pt-1 pb-2'>
                            <DataAccountInfoContainer localStored={localStored} />
                            <DataStatusContainer localStored={localStored} />
                        </div>
                    </div>
                    <div className='px-7 mt-2 flex justify-end gap-2'>
                        <Button type='button' clickSync={handleRestore} custom='bg-[#4D96FF] text-white' text='Restore' />
                    </div>
                </div>}

                {page === 2 && (
                    <div className='px-6 py-2'>
                        <h1 className='font-medium flex gap-1 py-1'>
                            <span className='leading-none'>Advance Action Tab</span>
                            <span className='text-[10px] text-[#ffffff53] self-end'>For Debugging</span>
                        </h1>
                        <div className='mt-1'>
                            <button onClick={() => console.log(downloadedPhotoLinks)} className='rounded w-full text-left px-2 text-sm font-medium h-[32px] bg-[#ffffff15]'>Logs Downloaded Links</button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    ) : <></>
}

export default AdvanceSettings