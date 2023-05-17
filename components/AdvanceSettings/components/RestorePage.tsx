import React from 'react'
import DataAccountInfoContainer from './DataAccountInfoContainer'
import DataStatusContainer from './DataStatusContainer'
import Button from '@components/components/Button'
import { LocalStoredInterface } from '../../../types/all'

const RestorePage = ({
    localStored,
    handleRestore
}: {
    localStored: LocalStoredInterface
    handleRestore: () => void
}) => {
    return (
        <div className=''>
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
        </div>
    )
}

export default RestorePage