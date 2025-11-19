import useDimensions from '@/hooks/useDimensions'
import { cn } from '@/lib/utils'
import { ResumeValues } from '@/lib/validation'
import React, { useRef } from 'react'
import PersonalPreview from './ResumeDesignItem/modern/PersonalPreview'
import ExpereinceAndProjects from './ResumeDesignItem/modern/ExpereinceAndProjects'
import Summary from './ResumeDesignItem/modern/Summary'
import Education from './ResumeDesignItem/modern/Education'
import Skills from './ResumeDesignItem/modern/Skills'
import SocialSite from './ResumeDesignItem/modern/SocialSite'

interface ResumePreviewProps{
    resumeData : ResumeValues
    className : string
}

export default function ResumePreview({resumeData, className}:ResumePreviewProps) {

    const containerRef = useRef<HTMLDivElement>(null)

    const {width} = useDimensions(containerRef)

  return (
    <div ref={containerRef} className={cn('bg-white text-black h-fit w-full aspect-210/297 border rounded py-8 px-6 relative', className)}>
        <div className={cn('previewDiv space-y-4', !width && 'invisible')}
        style={{zoom: (1/794)* width}}
        ref={containerRef} id='resumePreviewDiv'>
            <PersonalPreview resumeData={resumeData}/>
            <div className='grid grid-cols-12 pt-4 gap-2'>
                <div className='col-span-7 pr-12'>
                    <ExpereinceAndProjects resumeData={resumeData}/>
                </div>
                <div className='col-span-5 space-y-4'>
                    <Summary resumeData={resumeData}/>
                    <Skills resumeData={resumeData}/>
                    <Education resumeData={resumeData}/>
                    <SocialSite resumeData={resumeData}/>
                </div>
            </div>
        </div>
    </div>
  )
}
