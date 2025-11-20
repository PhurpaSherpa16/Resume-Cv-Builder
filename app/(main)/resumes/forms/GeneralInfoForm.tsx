import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { EditorProps } from '@/lib/type'
import {resumeInformationSchema, ResumeInformationValues } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export default function GeneralInfoForm({resumeData, setResumeData}:EditorProps) {
    const form = useForm<ResumeInformationValues>({
        resolver : zodResolver(resumeInformationSchema),
        defaultValues:{
            reumseTitle : resumeData.reumseTitle || '',
            description_resume : resumeData.description_resume ||'',
        }
    })

    useEffect(()=>{
        const {unsubscribe} = form.watch(async (values)=>{
            const valid = await form.trigger()
            if(!valid) return
            setResumeData({ ...resumeData, ...values });
        })
        return unsubscribe
    },[form, resumeData, setResumeData])

  return (
    <div className='space-y-4'>
        <div className='text-center'>
            <h2>General information</h2>
            <p>This section forms the foundation of your resume.</p>
        </div>
        <div>
            <Form {...form}>
                <form className='space-y-4  border p-4 rounded'>
                    <FormField control={form.control}
                    name='reumseTitle'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Resume Title</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder='My Cool Resume' autoFocus/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}>
                    </FormField>
                    <FormField control={form.control}
                    name='description_resume'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Descripton</FormLabel>
                            <FormControl>
                                <Textarea {...field} placeholder='My Cool Resume' autoFocus/>
                            </FormControl>
                            <FormDescription>
                                Add the description of this resume
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}>
                    </FormField>
                </form>
            </Form>
        </div>
    </div>
  )
}
