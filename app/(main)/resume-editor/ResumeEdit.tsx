'use client'
import React, { useState } from 'react'
import PersonalDetailsForms from '../resumes/forms/PersonalDetailsForms'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import GeneralInfoForm from '../resumes/forms/GeneralInfoForm'
import BreadCrumbSteps from './BreadCrumbSteps'
import { useSearchParams } from 'next/navigation'
import { steps } from './Steps'
import Footer from './Footer'
import { ResumeValues } from '@/lib/validation'

export default function ResumeEdit() {
  // all resume data are store her 1st step
  // check validation also
  const [resumeData, setResumeData] = useState<ResumeValues>({})

  // search Params to address breadcrumb steps

  const searchParams = useSearchParams()
  const currentStep = searchParams.get('step') || steps[0].key

  function setStep(key: string){
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('step', key)
    window.history.pushState(null, '', `?${newSearchParams.toString()}`)
  }

  // this formcomponent will tell which component shoudl visiable and hide
  const FormComponent = steps.find(step => step.key === currentStep)?.component

  return (
     <div className="container py-8 pb-100">
        <div className='grid grid-cols-12 md:divide-x h-full overflow-hidden
        gap-4'>
            <div className='col-span-6 h-[85vh] 2xl:h-[90vh]'>
              <div>
                <header className='space-y-4 pb-4'>
                  <div>
                    <h1>Your Career. Your Story. Your Resume.</h1>
                    <p>Fill in your experience and watch your resume come alive instantly.</p>
                  </div>
                  <div>
                    <BreadCrumbSteps currentsteps={currentStep} setCurrentSteps={setStep}/>
                  </div>
                </header>

                <main className='h-[59vh] 2xl:h-[65vh] overflow-scroll py-4 pr-4'>
                    {FormComponent && <FormComponent resumeData={resumeData} setResumeData={setResumeData}/>}
                </main>
              </div>
              <Footer currentsteps={currentStep} setCurrentSteps={setStep}/>
            </div>
            <div className='col-span-6 h-[85vh] overflow-y-auto pb-8'>
              <pre>
                {JSON.stringify(resumeData, null, 2)}
              </pre>
            </div>
        </div>
    </div>
  )
}
