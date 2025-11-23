import React from 'react'
import Navbar from './resumes/Navbar'

export default function layout({children} : {children : React.ReactNode}) {
  return (
    <div className='h-full md:h-screen overflow-hidden'>
        <Navbar/>
        {children}
    </div>
  )
}
