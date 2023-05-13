import React from 'react'
import { BounceLoader } from 'react-spinners'

const loading = () => {
  return (
    <div className='h-screem w-full grid place-items-center'>
      <BounceLoader color="#36d7b7" />
    </div>
  )
}

export default loading