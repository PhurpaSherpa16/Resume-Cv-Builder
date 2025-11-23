import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { steps } from './Steps'
import { FileUpIcon, PenLineIcon } from 'lucide-react'

interface FooterProps{
    currentsteps : string
    setCurrentSteps : (step: string) => void
    showResumePreview : boolean
    setShowResumePreview : (show : boolean) => void
}

export default function Footer({currentsteps, setCurrentSteps, showResumePreview, setShowResumePreview}:FooterProps) {
    const previous = steps.find(
        (_, index) => steps[index+1]?.key === currentsteps
    )?.key

    const nextStep = steps.find(
        (_, index) => steps[index - 1]?.key === currentsteps
    )?.key

  return (
    <footer className='py-4 flex gap-4 justify-between pr-4'>
        <div className='flex items-center gap-4'>
            <Button variant={'secondary'}
            onClick={previous ? ()=> setCurrentSteps(previous): undefined}
            disabled={!previous}>
                Prev
            </Button>
            <Button variant={'default'}
            onClick={nextStep ? ()=> setCurrentSteps(nextStep): undefined}
            disabled={!nextStep}
            >
                Next
            </Button>
        </div>

        <Button variant={'outline'} type='button' size={'icon'}
        onClick={()=> setShowResumePreview(!showResumePreview)}
        className='lg:hidden'
        title={showResumePreview ? 'Show PDF Preview' : 'Show Editor'}>
            {showResumePreview ? <PenLineIcon/> : <FileUpIcon/>}
        </Button>

        <div className='flex items-center gap-4'>
            <p className='flex items-center opacity-0'>
            Saving...
            </p>
            <Button variant={'secondary'} asChild>
                <Link href={"/resumes"}>
                Close
                </Link>
            </Button>
        </div>
    </footer>
  )
}
