'use client'

import { useData } from '@context/DataContext'
import { ProviderValuesInterface } from '../../types/all'
import Link from 'next/link'
import { FaTwitter, FaGithub, FaExclamationCircle } from 'react-icons/fa'
import { HiMenuAlt2 } from 'react-icons/hi'
import { RxCross2 } from 'react-icons/rx'

const NavigationBar = () => {
    const { systemState, updateSystemState } = useData() as ProviderValuesInterface
    return (
        <nav className='grid grid-cols-3 items-center h-full gap-2 px-4'>
            <div className='text-2xl sm:text-3xl font-bold h-auto truncate flex items-center'>
                <button onClick={() => updateSystemState({ mobileNav: !systemState.mobileNav})} className='text-white block sm:hidden'>{!systemState.mobileNav ? <HiMenuAlt2 /> : <RxCross2 />}</button>
                <span className='hidden sm:block'>Twitter Renderer</span>
            </div>
            <div className='flex justify-center text-3xl '>
                <FaTwitter />
            </div>
            <div className='flex justify-end gap-3 items-center'>
                <button className='flex items-center justify-center sm:justify-normal gap-1 bg-[#1DA1F2] rounded-full h-6 aspect-square sm:aspect-auto p-0 sm:px-2 sm:py-4'>
                    <span className='text-sm sm:text-base'><FaExclamationCircle /></span>
                    <span className='hidden sm:block text-xs font-bold'>Instructions</span>
                </button>
                <Link href='https://github.com/Boreumdal' className='text-2xl sm:text-3xl'><FaGithub /></Link>
            </div>
        </nav>
  )
}

export default NavigationBar