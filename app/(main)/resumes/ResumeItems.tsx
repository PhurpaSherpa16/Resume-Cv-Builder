'use client'
import React, { useEffect, useState } from 'react'
import resumeData from "@/data/tempResumePreviewData.json" assert { type: "json" };
import ModernTemplate from './template/ModernTemplate';
import ClassicTemplate from './template/ClassicTemplate';
import Link from 'next/link';
import { Button } from '@/components/ui/button';



export default function ResumeItems() {  

    const [mounted, setMounted] = useState(false)
    
    useEffect(()=>{
        const timer = setTimeout(()=>setMounted(true), 100)
        return ()=>clearTimeout(timer)
    },[])
    
    
    if(!mounted){
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }
    
  return (
    <div className='space-y-4'>
       <div className='flex gap-8 flex-wrap'>
            <div className='space-y-4 grid'>
                <ModernTemplate resumeData={resumeData}/>
                <Button variant={'secondary'} asChild>
                    <Link href={`/resume-editor?template=modern_design`}>
                        Modern Design
                    </Link>
                </Button>
            </div>
            <div className='space-y-4 grid'>
                <ClassicTemplate resumeData={resumeData}/>
                <Button variant={'secondary'} asChild >
                    <Link href={`/resume-editor?template=classic_design`}>
                        Classic Design
                    </Link>
                </Button>
            </div>
            
       </div>

    </div>
  )
}
