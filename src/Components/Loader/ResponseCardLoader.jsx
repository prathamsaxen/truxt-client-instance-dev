import { Skeleton } from '@mui/material'
import React from 'react'

const ResponseCardLoader = () => {
  return (
    <div className='response-card-loader'>
        <Skeleton variant="rounded" height={22} animation="wave" />
        {/* <Skeleton variant="rounded" height={22} animation="wave" /> */}
        {/* <Skeleton variant="rounded" height={22} animation="wave" /> */}
    </div>
  )
}

export default ResponseCardLoader