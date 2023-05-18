
import AdvanceSettings from '@components/AdvanceSettings'
import TwitterDisplay from '@components/TwitterDisplay'
import TwitterIdCrawler from '@components/Crawler'
import NavigationBar from '@components/NavigationBar'

const Home = () => {
    return (
        <div className=' bg-[#2B2B2B] text-white w-full grid grid-rows-[auto_92vh] h-screen overflow-hidden'>
            <NavigationBar />
            <div className='flex sm:grid relative sm:grid-cols-[450px_auto] h-full gap-2 pb-4 px-4'>
                <div className='h-full absolute sm:relative left-0 bottom-0 z-10'>
                    <TwitterIdCrawler />
                </div>
                <div className='overflow-y-scroll absolute sm:relative inset-2 sm:inset-0 pr-1 z-0'>
                    <TwitterDisplay />
                </div>
            </div>
            <AdvanceSettings />
        </div>
    )
}

export default Home