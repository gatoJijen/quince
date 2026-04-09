import Downbar from '@/components/Downbar'
import Navbar from '@/components/Navbar'
import PhotoCarousel from '@/components/PhotoCarrusel'
import React from 'react'

const page = () => {
  return (
    <div className='w-dvw h-dvh bg-linear-to-br from-pink-50 to-purple-100'>
      <Navbar/>
      <PhotoCarousel/>
      <Downbar showWindow={true} />
    </div>
  )
}

export default page