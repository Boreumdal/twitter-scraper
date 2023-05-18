import DataStatus from '../../components/DataStatus'
import { FaRegCopy } from 'react-icons/fa'
import { PostsDataInterface, FinalListInterface } from '../../../types/all'

const DataStatusContainer = ({ 
    allPosts, 
    finalList, 
    handleCopy, 
    totalPictures, 
    totalVideos 
}: { 
    allPosts: PostsDataInterface
    finalList: FinalListInterface[]
    handleCopy: (str: any) => void
    totalPictures: number
    totalVideos: number
}) => {
    return (
        <div>
            <h1 className='block font-medium pb-1'>Status</h1>
            <div className='flex flex-col gap-2 bg-[#ffffff15] p-3 text-white'>
                <div className='grid grid-cols-2'>
                    <DataStatus text='Overall Data Collected' count={finalList.length} />
                    <div className='flex justify-end'>
                        {finalList.length !== 0 && <button onClick={() => handleCopy(finalList)} className='text-xl h-fit'><FaRegCopy /></button>}
                    </div>
                </div>
                <div className='grid grid-cols-2'>
                    <DataStatus text='Videos Fetched' count={allPosts.posts ? allPosts?.posts?.includes?.media?.filter((attach: any) => attach.type === 'video').length : 0} />
                    <DataStatus text='Total Videos Fetched' count={totalVideos} />
                </div>
                <div className='grid grid-cols-2'>
                    <DataStatus text='Pictures Fetched' count={allPosts.posts ? allPosts?.posts?.includes?.media?.filter((attach: any) => attach.type === 'photo').length : 0} />
                    <DataStatus text='Total Pictures Fetched' count={totalPictures} />
                </div>
                <div className=''>
                    <DataStatus text='Total Media Fetched' count={totalPictures + totalVideos} />
                </div>
            </div>
        </div>
    )
}

export default DataStatusContainer