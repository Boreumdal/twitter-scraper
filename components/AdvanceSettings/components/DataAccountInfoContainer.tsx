import { LocalStoredInterface } from '../../../types/all'
import DataAccountInfo from './DataAccountInfo'

const DataAccountInfoContainer = ({ localStored }: { localStored: LocalStoredInterface }) => {
    return (
        <>
            <h1 className=''>Information</h1>
            <div className='flex flex-col gap-2 p-3 bg-[#ffffff15] text-white'>
                <DataAccountInfo title='Username' value={localStored.currentUsername} />
                <DataAccountInfo title='Current ID' value={localStored.currentId} />
                <DataAccountInfo title='Next Token' value={localStored.nextToken} />
            </div>
        </>
    )
}

export default DataAccountInfoContainer