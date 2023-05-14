'use client'

import React from 'react'
import { providerValuesInterface } from '../../types/all'
import { useData } from '@context/DataContext'
import DataStatusContainer from './components/DataStatusContainer'
import DataAccountInfoContainer from './components/DataAccountInfoContainer'
import Button from '@components/components/Button'

const AdvanceSettings = () => {
    const { setRestored, setTotalPictures, setTotalVideos, setTwitterUsername, setNextToken2, advanceToggle, setAdvanceToggle, localStored, setFinalList } = useData() as providerValuesInterface

    const handleRestore = () => {
        setTwitterUsername(localStored.currentUsername)
        setNextToken2(localStored.nextToken)
        setFinalList(localStored.finalListPosts)
        setTotalVideos(localStored.totalVideos)
        setTotalPictures(localStored.totalPictures)
        setRestored(true)
        setAdvanceToggle(false)
    }


    return advanceToggle ? (
        <div className='absolute inset-0 bg-[#33333383] text-white grid place-items-center'>
            <div className='w-[400px] bg-[#171717] shadow py-2'>
                <h1 className='text-2xl font-bold py-2 mx-4 border-b border-[#363636]'>Advance Option</h1>
                <div className='px-6 py-2'>
                    <h1 className='font-medium'>Restore Previous Data</h1>
                    <div className='flex flex-col gap-1 px-1 pt-1 pb-2'>
                        <DataAccountInfoContainer localStored={localStored} />
                        <DataStatusContainer localStored={localStored} />
                    </div>

                    <div className='mt-2 flex justify-end px-1 gap-2'>
                        <Button type='button' clickSync={() => setAdvanceToggle(false)} custom='bg-transparent text-white' text='Cancel' />
                        <Button type='button' clickSync={handleRestore} custom='bg-[#4D96FF] text-white' text='Restore' />
                    </div>
                </div>
            </div>
        </div>
    ) : <></>
}

export default AdvanceSettings