import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { EditorProps } from '@/lib/type'
import { skillSchema, SkillValues } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export default function SkillForm({resumeData, setResumeData}:EditorProps) {
    const skillForm = useForm<SkillValues>({
            resolver : zodResolver(skillSchema),
            defaultValues : {
                listOfSkills : resumeData.listOfSkills || []
            }
        })
    
    useEffect(()=>{
        const {unsubscribe} = skillForm.watch(async (values)=>{
            const isValid = await skillForm.trigger()
            if(!isValid) return
            setResumeData({
                ...resumeData,
                listOfSkills : values.listOfSkills?.filter((item)=> item !== undefined)
                .map((item) => item.trim())
                .filter((item)=> item !== "") || []
            })
        })
        return unsubscribe
    }, [skillForm, resumeData, setResumeData])


  return (
    <div className='space-y-4'>
        <div className='text-center'>
            <h2>Work Expereince</h2>
            <p>Add your previous roles, and responsibilities to strengthen your resume.</p>
        </div>
        <Form {...skillForm}>
            <form>
                <FormField
                control={skillForm.control}
                name={`listOfSkills`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className='sr-only'>Skills</FormLabel>
                        <FormControl>
                            <Textarea className='h-40' {...field} autoFocus placeholder='e.g. Next, React, Tailwind, Python'
                            onChange={(e)=>{field.onChange(e.target.value.split(','))}}
                            /> 
                        </FormControl>
                        <FormDescription>Seprate each skill with <span className='font-semibold'>(,) </span> for sepration.</FormDescription>
                        <FormMessage/>
                    </FormItem>
                )}
                />
            </form>
        </Form>
      
    </div>
  )
}
