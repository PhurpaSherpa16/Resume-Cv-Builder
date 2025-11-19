import { ResumePreviewProps } from '@/lib/type'
import { formatDate } from 'date-fns'
import React from 'react'
import { FaCalendar, FaUniversity } from 'react-icons/fa'
import { MdSchool } from 'react-icons/md'

export default function Education({resumeData}:ResumePreviewProps) {
    const {listOfEducation} = resumeData
    console.log(resumeData)
  return (
    <div>
        {listOfEducation?.length !== 0 ?
            <div className='space-y-4'>
                <h2 className='border-b-2 pb-2 border-black'>Edcuation</h2>
                <div className='space-y-4'>
                {listOfEducation?.map((item, index)=>(
                    <div key={index} className='grid gap-1 pb-4 last:border-0 border-b border-dotted border-black'>
                         {item.degree && 
                            <h2 className='flex items-center gap-2'>
                                <MdSchool className='size-4'/>
                                {item.degree}
                            </h2>
                        }
                        <div className='flex flex-wrap items-center gap-2 text-[#737373]'>
                            {item.schoolName && 
                            <span className='flex items-center gap-1'>
                                <FaUniversity className='size-3'/>
                                {item.schoolName}
                            </span>
                            }
                            {item.startDate && 
                            <p className='flex items-center gap-1'>
                            <FaCalendar className='size-3'/>
                            {formatDate(item.startDate ? item.startDate : '', 'MM/yyyy')} - {' '}
                            {item.endDate ? formatDate(item.endDate, "MM/yyyy") : 'Present' } </p>
                            }
                        </div>
                    </div>
                ))}
                </div>
            </div>
        :''    
    }
    </div>
  )
}
