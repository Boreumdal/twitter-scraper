'use client'

import React, { useState } from 'react'
import { ProviderValuesInterface } from '../../types/all'
import { useData } from '@context/DataContext'
import RestorePage from './components/RestorePage'
import MoreOptionPage from './components/MoreOptionPage'
import { MdFirstPage, MdLastPage } from 'react-icons/md'
import { RxCross2 } from 'react-icons/rx'

const AdvanceSettings = () => {
    const [page, setPage] = useState(1)
    const { setIsRestore, setTotalPictures, setTotalVideos, setTwitterUsername, setNextToken2, advanceToggle, downloadedPhotoLinks, setAdvanceToggle, localStored, setFinalList } = useData() as ProviderValuesInterface

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
                        {page === 2 ? <button onClick={() => setPage(1)} className='text-xl'><MdFirstPage /></button> : <button onClick={() => setPage(2)} className='text-xl'><MdLastPage /></button>}
                        <button onClick={() => setAdvanceToggle(false)} className='text-2xl hover:text-red-500'><RxCross2 /></button>
                    </div>
                </div>
                {page === 1 ? <RestorePage localStored={localStored} handleRestore={handleRestore} /> : <MoreOptionPage downloadedPhotoLinks={downloadedPhotoLinks} />}

            </div>
        </div>
    ) : <></>
}

export default AdvanceSettings