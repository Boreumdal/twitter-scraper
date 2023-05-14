'use client'

import AdvanceSettings from '@components/AdvanceSettings'
import TwitterDisplay from '@components/TwitterDisplay'
import TwitterIdCrawler from '@components/Crawler'
import React from 'react'
import NavigationBar from '@components/NavigationBar'

const Home = () => {
    
    return (
        <div className=' bg-[#2B2B2B] text-white w-full grid grid-rows-[auto_92vh] h-screen overflow-hidden'>
            <NavigationBar />
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