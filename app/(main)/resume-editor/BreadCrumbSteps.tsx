import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import React from 'react'
import { steps } from './Steps'

interface BreadCrumbProps{
    currentsteps : string,
    setCurrentSteps : (step : string) => void
}

export default function BreadCrumbSteps({currentsteps, setCurrentSteps}:BreadCrumbProps) {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
            {steps.map(step=>(
                <React.Fragment key={step.key}>
                    <BreadcrumbItem>
                        {step.key === currentsteps ?
                        <BreadcrumbPage>
                            {step.title}
                        </BreadcrumbPage>
                        :
                        <BreadcrumbLink>
                            <button onClick={()=>setCurrentSteps(step.key)} className='cursor-pointer'>
                                {step.title}
                            </button>
                        </BreadcrumbLink>
                        }
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className='last:hidden'/>
                </React.Fragment>
            ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
