const DataStatus = ({
    text,
    count
}: {
    text: string
    count: number | undefined
}) => (
    <div>
        <h3 className='text-xs sm:text-sm font-bold'>{text}:</h3>
        <p className='text-base sm:text-lg opacity-50 font-medium'>{count}</p>
    </div>
)

export default DataStatus