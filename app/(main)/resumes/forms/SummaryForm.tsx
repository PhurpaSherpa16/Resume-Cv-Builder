import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { EditorProps } from '@/lib/type'
import { summarySchema, SummaryValues } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

export default function SummaryForm({resumeData, setResumeData}:EditorProps) {
    const summaryForm = useForm<SummaryValues>({
        resolver : zodResolver(summarySchema),
        defaultValues : {
            summary : resumeData.summary || ''
        }
    })

    useEffect(() => {
    const subscription = summaryForm.watch(async (values) => {
        const isValid = await summaryForm.trigger();
        if (!isValid) return;
        setResumeData({...resumeData, ...values});
    });

  return () => subscription.unsubscribe();
}, [summaryForm, setResumeData]);

  return (
    <div className='space-y-4'>
        <div className='text-center'>
            <h2>Professional Summary</h2>
            <p>Explain how your skills will improve efficiency and deliver results.</p>
        </div>
        <FormProvider {...summaryForm}>
            <form className='space-y-3'>
                <FormField
                control={summaryForm.control}
                name='summary'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className='sr-only'>Summary</FormLabel>
                        <FormControl>
                            <Textarea className='h-40' {...field} autoFocus placeholder='I specialize in building fast, accessible interfaces that streamline the user experience and reduce maintenance overhead for development teams.'/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            </form>
        </FormProvider>
    </div>
  )
}
