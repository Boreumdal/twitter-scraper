import { LocalStoredInterface } from '../../../types/all'
import DataStatus from './DataStatus'

const DataStatusContainer = ({ localStored }: { localStored: LocalStoredInterface}) => {
    return (
        <>
            <h1 className=''>Status</h1>
                <div className='flex flex-col gap-2 p-3 bg-[#ffffff15] text-white'>
                    <div className=''>
                        <DataStatus title='Overall Data Collected:' value={localStored.finalListPosts.length} />
                    </div>
                    <div className='grid grid-cols-2'>
                        <DataStatus title='Total Pictures Fetched:' value={localStored.totalPictures} />
                        <DataStatus title='Total Videos Fetched:' value={localStored.totalVideos} />
                    </div>
                    <div className=''>
                        <DataStatus title='Total Media Fetched:' value={+localStored.totalPictures + +localStored.totalVideos} />
                    </div>
                </div>
        </>
    )
}

export default DataStatusContainer