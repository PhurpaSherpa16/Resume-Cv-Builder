import React from 'react'
import ResumeEdit from './ResumeEdit'
import { Metadata } from 'next'

export const metadata : Metadata ={
    title: 'Design Resume'
}

export default function page() {
  return <ResumeEdit/>
}
