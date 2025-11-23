import { Metadata } from 'next'
import { lazy } from 'react'

export const metadata : Metadata ={
  title : 'New Resume'
}

const ResumeTemplate = lazy(()=>import('./ResumeItems'))

export default function page() {
  
  return (
    <main className='container py-8 space-y-4 px-4'>
      <div>
        <h1>Choose Your Template</h1>
        <p>Start Designing and apply for new role, Now!</p>
      </div>
      <ResumeTemplate/>
    </main>
  )
}
