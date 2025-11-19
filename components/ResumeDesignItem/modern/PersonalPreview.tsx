import { BorderStyles } from '@/app/(main)/resume-editor/BorderStyleButton'
import { ResumePreviewProps } from '@/lib/type'
import Image from 'next/image'
import React, { useEffect, useMemo } from 'react'
import { FaLinkedin, FaPhone, FaPhoneAlt } from 'react-icons/fa'
import { MdEmail, MdLocationOn } from 'react-icons/md'

export default function PersonalPreview({resumeData}:ResumePreviewProps) {
    const {photo, firstName, lastName, phone, jobTitle, linkedin, email, country, city, colorHex, borderStyle} = resumeData

    const photoSrc = useMemo(() => {
        if (photo instanceof File) {
            return URL.createObjectURL(photo)
        }
        if (typeof photo === 'string') {
            return photo
        }
        return ''
    }, [photo])

    useEffect(() => {
        return () => {
            if (photo instanceof File && photoSrc) {
                URL.revokeObjectURL(photoSrc)
            }
        }
    }, [photo, photoSrc])

  return (
    <div className='flex items-center gap-6 w-full'>
      <div className='w-full'>
          <div className="flex justify-between w-full items-center">
            <div>
                <h1 className='name'
                style={{color: colorHex}}>{firstName} {lastName}</h1>
                <h2>{jobTitle}</h2>
                <div className="grid">
                    {linkedin &&
                        <p className='flex items-center gap-2'>
                            <FaLinkedin className='size-3'/>
                            {linkedin}
                        </p>
                    }
                    <div className='flex items-center gap-4'>
                        {phone &&
                            <p className='flex items-center gap-2'>
                                <FaPhoneAlt className='size-3'/>
                                {phone}
                            </p>
                        }
                        {email &&
                            <p className='flex items-center gap-2'>
                                <MdEmail className='size-3'/>
                                {email}
                            </p>
                        }
                    </div>
                    {(city || country) && 
                        <p className='flex items-center gap-2'>
                            <MdLocationOn className='size-3'/>
                            {city}
                            {city && country ? ', ' : ''}
                            {country}
                        </p>
                    }
                </div>
            </div>
            <div>
                {photoSrc && <Image
                src={photoSrc} height={100} width={100} alt='Author Photo'
                className='object-cover rounded-full size-20'
                style={{
                    borderRadius : borderStyle === BorderStyles.Square ? '0px'
                    : borderStyle === BorderStyles.Circle ? '1000px'
                    : '10px'
                }}
                />}
            </div>
          </div>
      </div>
    </div>
  )
}
