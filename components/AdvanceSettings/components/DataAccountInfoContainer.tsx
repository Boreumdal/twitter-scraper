import { localStoredInterface } from '../../../types/all'
import React from 'react'

const DataAccountInfoContainer = ({ localStored }: { localStored: localStoredInterface }) => {
    return (
        <>
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
        </>
    )
}

export default DataAccountInfoContainer