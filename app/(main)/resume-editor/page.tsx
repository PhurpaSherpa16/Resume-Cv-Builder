import React, { lazy, Suspense } from 'react'
import { Metadata } from 'next'

export const metadata : Metadata ={
    title: 'Design Resume'
}

interface PageProps {
  searchParams : Promise<{template ?: string}>
}

const ResumeEdit = lazy(()=>import('./ResumeEdit'))

export default async function page({searchParams}:PageProps) {

  const {template} = await searchParams


  return (
    <>
      <Suspense>
        <ResumeEdit template={template}/>
      </Suspense>
    </>
  )
  
}
