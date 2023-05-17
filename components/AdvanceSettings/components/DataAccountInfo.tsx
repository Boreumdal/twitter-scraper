const DataAccountInfo = ({ title, value }: { title: string, value: string }) => {
    return (
        <div className='grid grid-cols-2 items-center'>
            <p className='text-sm font-bold'>{title}</p>
            <p className='opacity-50 font-medium truncate'>{value}</p>
        </div>
    )
}

export default DataAccountInfo