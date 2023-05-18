import Image from 'next/image'
import { CurrentAccountInterface } from '../../../types/all'

const ProfileInformation = ({ currentAccount }: { currentAccount: CurrentAccountInterface }) => {
    return (
        <div>
            <div className='grid grid-cols-2 items-center justify-center pb-1'>
                <h1 className='block font-medium'>Information</h1>
            </div>
            
            <div className='grid grid-cols-[60px_auto] h-[67px] gap-2 bg-[#ffffff15]'>
                {currentAccount.id && <>
                    <div className='grid place-items-center p-1'>
                        <Image src={currentAccount?.profile_image_url} alt='dp' height={100} width={100} className='object-cover aspect-square rounded-full' />
                    </div>
                    <div className='flex flex-col justify-center '>
                        <h1 className='font-bold'>{currentAccount?.name}</h1>
                        <p className='font-medium opacity-50 text-xs'>@{currentAccount?.username}</p>
                    </div>
                </>}
            </div>
        </div>
    )
}

export default ProfileInformation