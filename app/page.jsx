
import AdvanceSettings from '@components/AdvanceSettings'
import TwitterDisplay from '@components/TwitterDisplay'
import TwitterIdCrawler from '@components/TwitterIdCrawler'
import Link from 'next/link'
import React from 'react'
import { FaTwitter, FaGithub, FaExclamationCircle } from 'react-icons/fa'

export const metadata = {
    title: 'Twitter Crawler'
}

const Home = () => {
    
    return (
        <div className=' bg-[#2B2B2B] text-white w-full grid grid-rows-[auto_92vh] h-screen overflow-hidden'>
            <div className='grid grid-cols-3 items-center h-full gap-2 px-4'>
                <div className='text-3xl font-bold h-auto'>
                    <span>Twitter Post Renderer</span>
                </div>
                <div className='flex justify-center text-3xl '>
                    <FaTwitter />
                </div>
                <div className='flex justify-end gap-3 items-center'>
                    <button className='flex items-center gap-1 bg-[#1DA1F2] rounded-full py-2 px-3'>
                        <span className='text-base'><FaExclamationCircle /></span>
                        <span className='text-xs font-bold'>Instructions</span>
                    </button>
                    <Link href='' className='text-3xl'><FaGithub /></Link>
                </div>
            </div>
            <div className='grid grid-cols-[450px_auto] h-full gap-2 pb-4 px-4'>
                <div className='h-full'>
                    <TwitterIdCrawler />
                </div>
                <div className='overflow-y-scroll pr-1'>
                    <TwitterDisplay />
                </div>
            </div>
            <AdvanceSettings />
        </div>
    )
}

export default Home