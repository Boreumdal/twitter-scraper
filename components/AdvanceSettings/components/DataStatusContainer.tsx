import { localStoredInterface } from '../../../types/all'
import React from 'react'

const DataStatusContainer = ({ localStored }: { localStored: localStoredInterface}) => {
    return (
        <>
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
        </>
    )
}

export default DataStatusContainer