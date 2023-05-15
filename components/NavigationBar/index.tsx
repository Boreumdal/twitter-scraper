'use client'

import { useData } from '@context/DataContext'
import { providerValuesInterface } from '../../types/all'
import Link from 'next/link'
import { FaTwitter, FaGithub, FaExclamationCircle } from 'react-icons/fa'
import { HiMenuAlt2 } from 'react-icons/hi'
import { RxCross2 } from 'react-icons/rx'

const NavigationBar = () => {
    const { mobileNav, setMobileNav } = useData() as providerValuesInterface
    return (
        <nav className='grid grid-cols-3 items-center h-full gap-2 px-4'>
            <div className='text-3xl font-bold h-auto truncate flex items-center'>
                <button onClick={() => setMobileNav(prev => !prev)} className='text-white block sm:hidden'>{!mobileNav ? <HiMenuAlt2 /> : <RxCross2 />}</button>
                <span className='hidden sm:block'>Twitter Renderer</span>
            </div>
            <div className='flex justify-center text-xl sm:text-3xl '>
                <FaTwitter />
            </div>
            <div className='flex justify-end gap-3 items-center'>
                <button className='flex items-center gap-1 bg-[#1DA1F2] rounded-full py-2 px-2'>
                    <span className='text-base'><FaExclamationCircle /></span>
                    <span className='hidden sm:block text-xs font-bold'>Instructions</span>
                </button>
                <Link href='https://github.com/Boreumdal' className='text-3xl'><FaGithub /></Link>
            </div>
        </nav>
  )
}

export default NavigationBar