const DataStatus = ({ title, value }: { title: string, value: string | number }) => {
    return (
        <div>
            <h3 className='text-sm font-bold'>{title}</h3>
            <p className='text-lg opacity-50 font-medium'>{value}</p>
        </div>
    )
}

export default DataStatus