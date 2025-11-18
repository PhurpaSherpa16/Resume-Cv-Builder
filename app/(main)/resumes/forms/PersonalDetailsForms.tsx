import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { EditorProps } from '@/lib/type'
import { PersonalInformaionValues, personalInformationSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'

export default function PersonalDetailsForms({resumeData, setResumeData}:EditorProps) {
    const form = useForm<PersonalInformaionValues>({
        resolver : zodResolver(personalInformationSchema),
        defaultValues:{
            firstName : resumeData.firstName || "",
            lastName : resumeData.lastName || "",
            jobTitle : resumeData.jobTitle || "",
            city : resumeData.city || "",
            country : resumeData.country || "",
            phone : resumeData.phone || "",
            email : resumeData.email || "",
            linkedin : resumeData.linkedin || "",
        }
    })

    // optimazied varient
    useEffect(()=>{
        const {unsubscribe} = form.watch(async (_, {name}) =>{
            const valid = await form.trigger(name)
            if(!valid) return
            setResumeData(prev => ({...prev, [name]:form.getValues(name)}))
        })
        return unsubscribe
    },[form, resumeData, setResumeData])

    const photoRef = useRef<HTMLInputElement>(null)

  return (
    <div className='space-y-4'>
        <div className='text-center'>
            <h2>Personal Information</h2>
            <p>These details help employers reach out to you easily.</p>
        </div>
        <Form {...form}>
            <form className='space-y-4 border p-4 rounded'>
                <div className='w-full'>
                    <FormField control={form.control} name='photo'
                    render={({field: {value, onChange, ...fieldValues}})=>(
                        <FormItem>
                            <FormLabel>Your Photo</FormLabel>
                            <div className='flex gap-2 w-full'>
                                <div className='w-full'>
                                    <FormControl>
                                        <Input {...fieldValues} 
                                        type='file'
                                        ref={photoRef}
                                        accept='image/*'
                                        onChange={(e)=>{
                                            const file = e.target.files?.[0]
                                            onChange(file)
                                        }}/>
                                    </FormControl>
                                    <FormMessage/>
                                </div>
                                <Button variant={'secondary'} className='hover:bg-red-500 hover:text-white transition-all cursor-pointer'
                                type='button'
                                onClick={()=>{
                                    onChange(null)
                                    if (photoRef.current){
                                        photoRef.current.value = ''
                                    }}}>
                                    Remove
                                </Button>
                            </div>
                        </FormItem>
                    )}
                    />
                </div>
                <div className='flex gap-4'>
                    <div className='w-full'>
                            <FormField control={form.control} name='firstName'
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder='John'/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                    </div>
                    <div className='w-full'>
                            <FormField control={form.control} name='lastName'
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder='Doe'/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                    </div>
                </div>
                <div className='w-full'>
                        <FormField control={form.control} name='jobTitle'
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Job Title</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder='Frontend Developer'/>
                                </FormControl>
                            </FormItem>
                        )}/>
                </div>
                <div className='w-full'>
                        <FormField control={form.control} name='linkedin'
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Linkedin Link</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder='https://www.linkedin.com/'/>
                                </FormControl>
                            </FormItem>
                        )}/>
                </div>
                <div className='w-full'>
                    <FormField control={form.control} name='email'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder='example.frontend_developer@gmail.com'/>
                            </FormControl>
                        </FormItem>
                    )}/>
                </div>
                <div className='w-full'>
                    <FormField control={form.control} name='phone'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder='9834563478'/>
                            </FormControl>
                        </FormItem>
                    )}/>
                </div>
                <div className='w-full'>
                    <FormField control={form.control} name='country'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder='Nepal'/>
                            </FormControl>
                        </FormItem>
                    )}/>
                </div>
                <div className='w-full'>
                    <FormField control={form.control} name='city'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder='Kathmandu'/>
                            </FormControl>
                        </FormItem>
                    )}/>
                </div>
            </form>
        </Form>
    </div>
  )
}
