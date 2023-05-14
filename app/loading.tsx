'use client'

import React from 'react'
import { GridLoader } from 'react-spinners'

const loading = () => {
  return (
    <div className='h-screen w-full grid place-items-center'>
      <GridLoader color="#fff" />
    </div>
  )
}

export default loading