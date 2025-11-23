import { ResumePreviewProps } from '@/lib/type'
import { FaBehance, FaDribbble, FaFacebook, FaGithub, FaInstagram, FaKaggle, FaMedium } from 'react-icons/fa'
import { TbWorldWww } from 'react-icons/tb'

export default function SocialSite({resumeData}:ResumePreviewProps) {
    const socialSite = [
        {label: resumeData.github, icon: <FaGithub className="size-3"/>},
        {label: resumeData.portfolio, icon: <TbWorldWww className="size-3"/>},
        {label: resumeData.kaggle, icon: <FaKaggle className="size-3"/>},
        {label: resumeData.facebook, icon: <FaFacebook className="size-3"/>},
        {label: resumeData.instagram, icon: <FaInstagram className="size-3"/>},
        {label: resumeData.behance, icon: <FaBehance className="size-3"/>},
        {label: resumeData.dribble, icon: <FaDribbble className="size-3"/>},
        {label: resumeData.medium, icon: <FaMedium className="size-3"/>},
    ]

    const validSocials = socialSite.filter(item => item.label)
    if(validSocials.length === 0) return null

  return (
    <div className='space-y-4'>
        <h2 className='border-b-2  pb-2 border-black'>Social Site</h2>
        <div className='space-y-4'>
            {validSocials.map((item, index)=>(
               <p key={index} className="flex flex-wrap grow items-center gap-1">
                    {item.icon}
                    {item.label}
                </p> 
            ))}
        </div>
    </div>
  )
}
