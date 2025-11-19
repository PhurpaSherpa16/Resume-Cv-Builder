import ModernDesign from '@/components/ModernDesign'
import { ResumeValues } from '@/lib/validation'
import React from 'react'
import BorderStyleButton from './BorderStyleButton'
import ColorStyle from './ColorStyle'

interface ResumePreviewProps{
    resumeData : ResumeValues
    setResumeData : (data : ResumeValues ) => void
}

export default function PreviewSection({resumeData, setResumeData}:ResumePreviewProps) {

  return (
    <div className='preview hidden lg:block col-span-6 h-[85vh] overflow-y-auto pb-8'>
        <div className='relative z-10 flex gap-4 px-4 pb-4'>
           <ColorStyle color={resumeData.colorHex} 
          onChange={(item)=>setResumeData({...resumeData, colorHex: item})}/>

          <BorderStyleButton borderStyle={resumeData.borderStyle}
          onChange={(borderStyle)=>setResumeData({...resumeData, borderStyle})}/>

        </div>
        <div className='p-4 flex items-center w-full justify-center'>
            <ModernDesign resumeData={resumeData} className='shadow max-w-2xl'/>
        </div>
    </div>
  )
}
