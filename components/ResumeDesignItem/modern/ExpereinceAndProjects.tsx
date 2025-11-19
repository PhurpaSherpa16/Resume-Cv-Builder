import { ResumePreviewProps } from '@/lib/type'
import React from 'react'
import {formatDate} from 'date-fns'
import { FaCalendar } from 'react-icons/fa'
import { HiOfficeBuilding } from 'react-icons/hi'
import { IoIosLink } from 'react-icons/io'

export default function ExpereinceAndProjects({resumeData}:ResumePreviewProps) {
    const {listOfProjects, listOfWorkExperiences} = resumeData

  return (
    <div className='space-y-4'>

        {listOfWorkExperiences?.length !==0 ?
        <div className='space-y-4'>
          <h2 className='border-b-2 pb-2 border-black'>Work Expereince</h2>
          <div className='space-y-4'>
            {listOfWorkExperiences?.map((item, index)=>(
              <div key={index} className='grid gap-1 pb-4 last:border-0 border-b border-dotted border-black'>
                  <h2>{item.position}</h2>
                <div className='flex items-center gap-4'>
                    {item.company && 
                    <span className='flex items-center gap-1'>
                      <HiOfficeBuilding className='size-3'/>
                      {item.company}
                    </span>
                    }
                    {item.startDate && 
                    <p className='flex items-center gap-1'>
                    <FaCalendar className='size-3'/>
                    {formatDate(item.startDate ? item.startDate : '', 'MM/yyyy')} - {' '}
                    {item.endDate ? formatDate(item.endDate, "MM/yyyy") : 'Present' } </p>
                    }
                </div>
                <p className='whitespace-pre-line text-justify'>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        : ''
        }
        {listOfProjects?.length !== 0 ?
          <div className='space-y-4'>
            <h2 className='border-b-2 pb-2 border-black'>Projects</h2>
            <div className='space-y-4'>
              {listOfProjects?.map((item, index)=>(
                <div key={index} className='grid gap-1 pb-4 last:border-0 border-b border-dotted border-black'>
                    <h2>{item.projectName}</h2>
                   <div className='flex items-center gap-4'>
                      {item.projectLink && 
                      <span className='flex items-center gap-1 underline'>
                        <IoIosLink className='size-3'/>
                        {item.projectLink}
                      </span>
                      }
                   </div>
                   <p className='whitespace-pre-line text-justify'>
                        {item.description}
                    </p>
                </div>
              ))}
            </div>
          </div>
          : ''
        }
    </div>
  )
}
