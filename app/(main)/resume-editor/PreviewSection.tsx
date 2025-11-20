import ModernDesign from '@/components/ModernDesign'
import { ResumeValues } from '@/lib/validation'
import React, { useRef } from 'react'
import BorderStyleButton from './BorderStyleButton'
import ColorStyle from './ColorStyle'
import { Button } from '@/components/ui/button'
import { Printer } from 'lucide-react'
import {useReactToPrint} from 'react-to-print'
import { formatDate } from 'date-fns'
import { cn } from '@/lib/utils'


interface ResumePreviewProps{
    resumeData : ResumeValues
    setResumeData : (data : ResumeValues ) => void
    className?:string
}

export default function PreviewSection({resumeData, setResumeData, className}:ResumePreviewProps) {

  const contentRef = useRef(null)

  const printingDocument = useReactToPrint({
      contentRef,
      documentTitle : resumeData.reumseTitle ? `${resumeData.jobTitle}-CV-${formatDate(Date(), 'MM/yyyy')}` 
      : `${resumeData.firstName}_${resumeData.lastName}-CV-${formatDate(Date(), 'MM/yyyy')}`
  })

  return (
    <div className={cn('group preview flex flex-col md:col-span-6 overflow-y-auto pb-8', className)}>
        <div className='relative z-10 flex gap-4 px-4 lg:pb-4'>
           <ColorStyle color={resumeData.colorHex} 
          onChange={(item)=>setResumeData({...resumeData, colorHex: item})}/>

          <BorderStyleButton borderStyle={resumeData.borderStyle}
          onChange={(borderStyle)=>setResumeData({...resumeData, borderStyle})}/>

          <Button title='Print Document' size={'icon'} variant={'outline'}
          onClick={printingDocument}> 
            <Printer/>
          </Button>

        </div>
        <div className='p-4 flex items-center w-full justify-center'>
            <ModernDesign contentRef={contentRef} resumeData={resumeData} className='shadow max-w-2xl'/>
        </div>
    </div>
  )
}
