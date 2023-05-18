const MoreOptionPage = ({ downloadedPhotoLinks }: { downloadedPhotoLinks: string[] }) => {
    return (
        <div className='px-6 py-2'>
            <h1 className='font-medium flex gap-1 py-1'>
                <span className='leading-none'>Advance Action Tab</span>
                <span className='text-[10px] text-[#ffffff53] self-end'>For Debugging</span>
            </h1>
            <div className='mt-1'>
                <button onClick={() => console.log(downloadedPhotoLinks)} className='rounded w-full text-left px-2 text-sm font-medium h-[32px] bg-[#ffffff15]'>Logs Downloaded Links</button>
            </div>
        </div>
    )
}

export default MoreOptionPage