import { ResumePreviewProps } from '@/lib/type'
import React from 'react'

export default function Summary({resumeData}:ResumePreviewProps) {
    const {summary} = resumeData
  return (
    <div>
        <h2 className='border-b-2 pb-2 border-black'>Summary</h2>
        <div className='pt-2'>
            <p className='text-justify indent-8 whitespace-pre-line'>{summary}</p>
        </div>
    </div>
  )
}
