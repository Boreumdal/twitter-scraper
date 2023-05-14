import Link from 'next/link'
import { FaTwitter, FaGithub, FaExclamationCircle } from 'react-icons/fa'

const NavigationBar = () => {
    return (
        <nav className='grid grid-cols-3 items-center h-full gap-2 px-4'>
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
        </nav>
  )
}

export default NavigationBar