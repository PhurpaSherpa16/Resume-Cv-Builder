import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { EditorProps } from '@/lib/type'
import { socialSiteSchema, SocialSiteValues } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FaBehance, FaDribbble, FaFacebook, FaGithub, FaInstagram, FaKaggle, FaMedium } from 'react-icons/fa'
import { TbWorldWww } from 'react-icons/tb'

export default function SocialSiteForm({resumeData, setResumeData}:EditorProps) {
    const socialSiteForm = useForm<SocialSiteValues>({
        resolver : zodResolver(socialSiteSchema),
        defaultValues :{
            portfolio : resumeData.portfolio || '',
            github : resumeData.github || '',
            instagram : resumeData.instagram || '',
            facebook : resumeData.facebook || '',
            kaggle : resumeData.kaggle || '',
            dribble : resumeData.dribble || '',
            medium : resumeData.medium || '',
            behance : resumeData.behance || '',
        }
    })

    useEffect(()=>{
        const {unsubscribe} = socialSiteForm.watch(async (values) =>{
            const valid = await socialSiteForm.trigger()
            if(!valid) return
            setResumeData({ ...resumeData, ...values });
        })
        return unsubscribe
    },[socialSiteForm, resumeData, setResumeData])

  return (
    <div className='space-y-4'>
        <div className='text-center'>
            <h2>Personal Information</h2>
            <p>These details help employers reach out to you easily.</p>
        </div>
        <Form {...socialSiteForm}>
            <form className='space-y-4 border p-4 rounded'>
                <FormField control={socialSiteForm.control} 
                name='github'
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Github</FormLabel>
                        <div className='relative flex items-center'>
                            <FormControl className='pl-8'>
                                <Input {...field} placeholder='https://github.com'/>
                            </FormControl>
                            <FaGithub className='size-4 absolute left-2'/>
                        </div>
                        <FormMessage/>
                    </FormItem>
                )}/>
                <FormField control={socialSiteForm.control} 
                name='portfolio'
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Portfolio</FormLabel>
                        <div className='relative flex items-center'>
                            <FormControl className='pl-8'>
                                <Input {...field} placeholder='https://portfolio.com'/>
                            </FormControl>
                            <TbWorldWww className='size-4 absolute left-2'/>
                        </div>
                        <FormMessage/>
                    </FormItem>
                )}/>
                <FormField control={socialSiteForm.control} 
                name='kaggle'
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Kaggle</FormLabel>
                        <div className='relative flex items-center'>
                            <FormControl className='pl-8'>
                                <Input {...field} placeholder='https://kaggle.com'/>
                            </FormControl>
                            <FaKaggle className='size-4 absolute left-2'/>
                        </div>
                        <FormMessage/>
                    </FormItem>
                )}/>
                <FormField control={socialSiteForm.control} 
                name='behance'
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Behance</FormLabel>
                        <div className='relative flex items-center'>
                            <FormControl className='pl-8'>
                                <Input {...field} placeholder='https://behance.com'/>
                            </FormControl>
                            <FaBehance className='size-4 absolute left-2'/>
                        </div>
                        <FormMessage/>
                    </FormItem>
                )}/>
                <FormField control={socialSiteForm.control} 
                name='dribble'
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Dribble</FormLabel>
                        <div className='relative flex items-center'>
                            <FormControl className='pl-8'>
                                <Input {...field} placeholder='https://dribble.com'/>
                            </FormControl>
                            <FaDribbble className='size-4 absolute left-2'/>
                        </div>
                        <FormMessage/>
                    </FormItem>
                )}/>
                <FormField control={socialSiteForm.control} 
                name='medium'
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Medium</FormLabel>
                        <div className='relative flex items-center'>
                            <FormControl className='pl-8'>
                                 <Input {...field} placeholder='https://medium.com'/>
                            </FormControl>
                            <FaMedium className='size-4 absolute left-2'/>
                        </div>
                        <FormMessage/>
                    </FormItem>
                )}/>
                <FormField control={socialSiteForm.control} 
                name='instagram'
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Instagram</FormLabel>
                        <div className='relative flex items-center'>
                            <FormControl className='pl-8'>
                                <Input {...field} placeholder='https://instagram.com'/>
                            </FormControl>
                            <FaInstagram className='size-4 absolute left-2'/>
                        </div>
                        <FormMessage/>
                    </FormItem>
                )}/>
                <FormField control={socialSiteForm.control} 
                name='facebook'
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Facebook</FormLabel>
                        <div className='relative flex items-center'>
                            <FormControl className='pl-8'>
                                <Input {...field} placeholder='https://facebook.com'/>
                            </FormControl>
                            <FaFacebook className='size-4 absolute left-2'/>
                        </div>
                        <FormMessage/>
                    </FormItem>
                )}/>
            </form>
        </Form>
      
    </div>
  )
}
