import { ResumePreviewProps } from '@/lib/type'
import React from 'react'

export default function Skills({resumeData}:ResumePreviewProps) {
    const {listOfSkills, colorHex} = resumeData
  return (
    <div>

        {listOfSkills?.length !==0 ?
            <div className='space-y-4'>
                <h2 className='border-b-2 pb-2 border-black'>Skills</h2>
                <div className='flex flex-wrap gap-4'>
                    {listOfSkills?.map((item, index)=>(
                        <span key={index} className='bg-red-400 px-4 rounded text-white'
                        style={{backgroundColor: colorHex}}>
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        :''
        }
      
    </div>
  )
}
