'use client'
import { lazy, useEffect, useState } from 'react'
import BreadCrumbSteps from './BreadCrumbSteps'
import { useSearchParams } from 'next/navigation'
import { steps } from './Steps'
import Footer from './Footer'
import { ResumeValues } from '@/lib/validation'
import { cn } from '@/lib/utils'
import { useMediaQuery } from 'react-responsive'

const PreviewSection = lazy(()=>import('./PreviewSection'))

interface ResumeEditProps{
  template : string | undefined
}

export default function ResumeEdit({template}:ResumeEditProps) {
  // all resume data are store her 1st step
  // check validation also
  const [resumeData, setResumeData] = useState<ResumeValues>({
    firstName : 'Phurpa',
    lastName : 'Sherpa',
    jobTitle : 'Frontend Developer',
    linkedin : 'https://www.linkedin.com/help/linkedin/',
    email : 'phurpasherpa123@gmail.com',
    phone : '9813454003',
    country : 'Nepal',
    city : 'Kathmandu',
    summary : `I bring strong problem-solving skills and a focus on efficiency, helping your team reduce development time and improve overall project performance.
    I bring strong problem-solving skills and a focus on efficiency, helping your team reduce development time and improve overall project performance.`,
    photo : 'https://render.fineartamerica.com/images/rendered/medium/print/6/8/break/images-medium-5/awesome-solitude-bess-hamiti.jpg',
    listOfWorkExperiences:[
      {
        company : 'Green Apple Inc',
        position : 'Frontend Developer',
        startDate : '12 Feb, 2019',
        endDate : '',
        description : 
        `Frontend Developer with 5+ years of experience building modern, minimal, and high-quality web applications. Skilled in creating responsive, user-focused interfaces with clean code, strong attention to detail, and smooth performance.
Expert in modern frontend technologies — React, Next.js, TypeScript, Tailwind, UI libraries.
Builds premium and minimal designs with strong UI/UX focus, accessibility, and high performance.
Proven experience delivering polished, production-ready websites that meet business goals.
        `
      }
    ],
    listOfProjects :[
      {
        projectName : 'Portfolio',
        projectLink : 'https://www.portfolio.com',
        description : `Expert in modern frontend technologies — React, Next.js, TypeScript, Tailwind, UI libraries.
Builds premium and minimal designs with strong UI/UX focus, accessibility, and high performance.
Proven experience delivering polished, production-ready websites that meet business goals.`
      }
    ],
    listOfEducation :[
      {
        schoolName : 'Oxford Unoversity',
        degree : 'BSc. Hons in Computing',
      }
    ],
    listOfSkills: [
    'Next.js',
    'React.js',
    'TypeScript',
    'JavaScript (ES6+)',
    'Tailwind CSS',
    'Responsive Design',
    'Git & GitHub'
  ],
  github : 'https://www.github.com',
  portfolio : 'https://www.github.com',
  behance : 'https://www.behance.com',
  })

  // search Params to address breadcrumb steps

  const searchParams = useSearchParams()

  const currentStep = searchParams.get('step') || steps[0].key
  const [showResumePreview, setShowResumePreview] = useState(false)

  const isMd = useMediaQuery({query: '(min-width: 769px)'})

  function setStep(key: string){
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('step', key)
    window.history.pushState(null, '', `?${newSearchParams.toString()}`)
  }


  // this formcomponent will tell which component shoudl visiable and hide
  const FormComponent = steps.find(step => step.key === currentStep)?.component

  const [mounted, setMounted] = useState(false)

  useEffect(()=>{
      const timer = setTimeout(()=>setMounted(true), 100)
      return ()=>clearTimeout(timer)
  },[])

  if(!mounted){
    return (
      <div className="container py-8">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <>
    {/* Tablet and Mobile Version */}
    {!isMd ?
      <div className='px-4 md:px-8 lg:px-0 py-4 lg:py-8 h-full'>
        <div className='relative space-y-4  h-full'>
          <div className='relative space-y-2'>
            <div>
              <h1>Your Career. Your Story. Your Resume.</h1>
              <p>Fill in your experience and watch your resume come alive instantly.</p>
            </div>
          </div>
          
          {showResumePreview ?
          <div className='h-full'>
            <PreviewSection template={template} resumeData={resumeData} setResumeData={setResumeData}
            className={cn(showResumePreview && 'flex')}/>
          </div>
          :
          <div className='min-h-[50vh]'>
              <div>
                <BreadCrumbSteps currentsteps={currentStep} setCurrentSteps={setStep}/>
              </div>
              {FormComponent && <FormComponent resumeData={resumeData} setResumeData={setResumeData}/>}
          </div>
          }
          <div className='relative w-full'>
            <Footer currentsteps={currentStep} setCurrentSteps={setStep}
              showResumePreview={showResumePreview} setShowResumePreview={setShowResumePreview}/>
          </div>
        </div>
      </div>
      :
     <div className="container py-8 pb-100">
        <div className='grid grid-cols-12 md:divide-x h-[85vh] overflow-hidden
        gap-4'>
            <div className='col-span-12 md:col-span-6'>
              <div className='h-[77vh] overflow-hidden'>
                <header className='space-y-4 pb-4'>
                  <div>
                    <h1>Your Career. Your Story. Your Resume.</h1>
                    <p>Fill in your experience and watch your resume come alive instantly.</p>
                  </div>
                  <div>
                    <BreadCrumbSteps currentsteps={currentStep} setCurrentSteps={setStep}/>
                  </div>
                </header>
                <main className={cn('h-[65vh] 2xl:h-[65vh] overflow-scroll py-4 pr-4', showResumePreview && 'hidden')}>
                    {FormComponent && <FormComponent resumeData={resumeData} setResumeData={setResumeData}/>}
                </main>
              </div>
              <Footer currentsteps={currentStep} setCurrentSteps={setStep}
              showResumePreview={showResumePreview} setShowResumePreview={setShowResumePreview}/>
            </div>
            <PreviewSection resumeData={resumeData} setResumeData={setResumeData}
            template={template}/>
        </div>
    </div>
    }
  </>
  )
}
