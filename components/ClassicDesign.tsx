import useDimensions from '@/hooks/useDimensions'
import { cn } from '@/lib/utils'
import { ResumeValues } from '@/lib/validation'
import React, { useRef } from 'react'

interface ResumePreviewProps{
    resumeData : ResumeValues
    className : string
    contentRef : React.Ref<HTMLDivElement>
}

const PersonalPreview = React.lazy(() => import('./ResumeDesignItem/modern/PersonalPreview'));
const ExpereinceAndProjects = React.lazy(() => import('./ResumeDesignItem/modern/ExpereinceAndProjects'));
const Summary = React.lazy(() => import('./ResumeDesignItem/modern/Summary'));
const Skills = React.lazy(() => import('./ResumeDesignItem/modern/Skills'));
const Education = React.lazy(() => import('./ResumeDesignItem/modern/Education'));
const SocialSite = React.lazy(() => import('./ResumeDesignItem/modern/SocialSite'));


export default function ResumePreview({resumeData, className, contentRef}:ResumePreviewProps) {

    const containerRef = useRef<HTMLDivElement>(null)

    const {width} = useDimensions(containerRef)

  return (
    <div ref={containerRef} className={cn('bg-white text-black h-fit w-full aspect-210/297  border rounded py-8 px-6 relative', className)}>
        <div className={cn('previewDiv sapce-y-2 space-y-4', !width && 'invisible')}
        style={{zoom: (1/794)* width}}
        ref={contentRef} id='resumePreviewDiv'>
            <PersonalPreview resumeData={resumeData}/>
            <div className='grid space-y-2 gap-2'>
                <Summary resumeData={resumeData}/>
                <ExpereinceAndProjects resumeData={resumeData}/>
                <Skills resumeData={resumeData}/>
                <Education resumeData={resumeData}/>
                <SocialSite resumeData={resumeData}/>
            </div>
        </div>
    </div>
  )
}

