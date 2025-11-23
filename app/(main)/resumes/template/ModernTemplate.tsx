import { ResumeValues } from '@/lib/validation';
import React from 'react'
import { useMediaQuery } from 'react-responsive';
const PersonalPreview = React.lazy(() => import('@/components/ResumeDesignItem/modern/PersonalPreview'));
const ExpereinceAndProjects = React.lazy(() => import('@/components/ResumeDesignItem/modern/ExpereinceAndProjects'));
const Summary = React.lazy(() => import('@/components/ResumeDesignItem/modern/Summary'));
const Skills = React.lazy(() => import('@/components/ResumeDesignItem/modern/Skills'));
const Education = React.lazy(() => import('@/components/ResumeDesignItem/modern/Education'));
const SocialSite = React.lazy(() => import('@/components/ResumeDesignItem/modern/SocialSite'));

interface ModernTemplateProps{
    resumeData : ResumeValues
}

export default function ModernTemplate({resumeData}:ModernTemplateProps) {
    const isMd = useMediaQuery({query: '(min-width: 769px)'})

    const width = isMd ? 200 : 400
  return (
    <div className='relative w-full lg:w-50 lg:h-[280] overflow-hidden rounded'>
        <div className='bg-white text-black h-fit w-full aspect-210/297 border rounded py-6 px-4 relative'>
            <div className='previewDiv space-y-4'
            style={{zoom: (1/794) * width}}
            id='resumePreviewDiv'>
                <PersonalPreview resumeData={resumeData}/>
                <div className='grid grid-cols-12 pt-4 gap-2'>
                    <div className='col-span-7 lg:pr-12'>
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
        <div className="absolute bottom-0 inset-x-0 h-10 bg-linear-to-t from-gray-300/50 to-transparent z-10" />
      </div>
  )
}
