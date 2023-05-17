'use client'

import Button from '@components/components/Button'
import { CrawlerStateInterface } from '../../../types/all'
import React from 'react'
import { PulseLoader } from 'react-spinners'

const IndentityForm = ({
    handleUsernameIdFetch,
    username,
    updateSystemState,
    state,
    updateState
}: {
    handleUsernameIdFetch: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
    username: string
    updateSystemState: any
    state: CrawlerStateInterface
    updateState: React.Dispatch<any>
}) => {
    return (
        <form onSubmit={handleUsernameIdFetch} className='flex flex-col gap-2'>
            <div className='flex flex-col gap-1'>
                <div className='flex flex-col justify-center gap-1'>
                    <label htmlFor='username' className='block font-medium'>Username</label>
                    <input type="text" id='username' className='block w-full h-[32px] bg-[#ffffff15] text-xs sm:text-sm outline-none text-white px-2 rounded disabled:opacity-75' value={username} onChange={e => updateSystemState({twitterUsername: e.target.value})} placeholder='Twitter ID' disabled={state.nextToken ? true : false} required />
                </div>
                <div className='flex flex-col justify-center gap-1'>
                    <label htmlFor='bearerToken' className='block font-medium'>Bearer Token</label>
                    <input type="text" id='bearerToken' className='block w-full h-[32px] bg-[#ffffff15] text-xs sm:text-sm outline-none text-white px-2 rounded disabled:opacity-75' value={state.bearer} onChange={e => updateState({ bearer: e.target.value})} placeholder='Bearer Token' disabled={state.nextToken ? true : false} required />
                </div>
            </div>

            <div className='flex justify-end items-center'>
                <Button type='submit' custom='bg-[#61B15A]' disable={!username || !state.bearer} text={state.loading2 ? <PulseLoader size={5} color="#fff" /> : 'Get User'} />
            </div>
        </form>
    )
}

export default IndentityForm