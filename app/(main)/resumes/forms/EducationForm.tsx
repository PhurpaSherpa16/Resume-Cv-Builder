import { EditorProps } from '@/lib/type'
import { educationSchema, EducationValues } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useRef, useState } from 'react'
import { FormProvider, useFieldArray, useForm, UseFormReturn } from 'react-hook-form'
import { closestCenter, DndContext, DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import {CSS} from '@dnd-kit/utilities'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import CollapseButton from '../CollapseButton'
import { ArchiveX, GripHorizontal } from 'lucide-react'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export default function EducationForm({resumeData, setResumeData}: EditorProps) {
    const educationForm = useForm<EducationValues>({
        resolver : zodResolver(educationSchema),
        defaultValues:{
            listOfEducation : resumeData.listOfEducation
        }
    })

    useEffect(()=>{
        const {unsubscribe} = educationForm.watch(async (values) =>{
            const valid = await educationForm.trigger()
            if(!valid) return
            setResumeData({...resumeData, 
                listOfEducation : values.listOfEducation?.filter(item=>item!==undefined)|| [],
            })
        })
        return unsubscribe
    },[educationForm, resumeData, setResumeData])
    
    const {fields, append, remove, move} = useFieldArray({
            control: educationForm.control,
            name : 'listOfEducation'
        })
    
    //step 2 dnd -> add below code
    const sensors = useSensors(
            useSensor(PointerSensor),
            useSensor(KeyboardSensor,{
                coordinateGetter : sortableKeyboardCoordinates
            })
        )

    const handleDragEvent = (event : DragEndEvent)=>{
        const {active, over} = event
        const newIndex = fields.findIndex(item => item.id === active.id)
        const oldIndex = fields.findIndex(item => item.id === over?.id)
        move(oldIndex, newIndex)
        return arrayMove(fields, oldIndex, newIndex)
    }
  return (
    <div className='space-y-4'>
        <div className='text-center'>
            <h2>Educational History</h2>
            <p>Include completed degrees, courses, or certifications.</p>
        </div>
        <FormProvider {...educationForm}>
            <form className='space-y-4'>
                <DndContext sensors={sensors} collisionDetection={closestCenter}
                onDragEnd={handleDragEvent} modifiers={[restrictToVerticalAxis]}>
                    <SortableContext items={fields} 
                    strategy={verticalListSortingStrategy}>
                        {fields.map((item, index)=>(
                            <EducationItem 
                            key={item.id}
                            id={item.id}
                            index={index} 
                            educationForm={educationForm}
                            remove={remove}
                            />
                        ))}
                    </SortableContext>
                </DndContext>

                <div className='flex justify-center'>
                    <Button type='button'
                    onClick={()=>append({
                        degree : '',
                        schoolName : '',
                        startDate : '',
                        endDate : ''
                    })}>
                        Add Educational Degree
                    </Button>
                </div>
            </form>
        </FormProvider>
      
    </div>
  )
}

interface EducationItemProps {
    id : string
    educationForm : UseFormReturn<EducationValues>
    index: number
    remove : (index : number) => void
}

function EducationItem({id, educationForm, index, remove}:EducationItemProps){
    const {attributes, setNodeRef, listeners, transform, transition, isDragging} = useSortable({id})
    
    const [expand, setExpand] = useState(false)
    const divRef = useRef<HTMLDivElement>(null)

return (
        <div ref={setNodeRef} 
        className={cn('border rounded bg-(--background) p-4', isDragging && 'shadow-2xl scale-90 transition-transform relative z-10')}
        style={{transform: CSS.Transform.toString(transform), transition}}>
            <div className='flex justify-between'>
                <CollapseButton title={`Work experience ${index+1}`} reference={divRef}
                expand={expand} setExpand={setExpand}/>
                <GripHorizontal className='size-4 cursor-grab text-(--muted-foreground) outline-0'
                {...attributes} {...listeners}/>
            </div>
            <div ref={divRef} className='space-y-4 overflow-hidden h-0'>
                <FormField
                control={educationForm.control}
                name={`listOfEducation.${index}.degree`}
                render={({field})=>(
                    <FormItem className='pt-4'>
                        <FormLabel>Course of study</FormLabel>
                        <FormControl>
                            <Input {...field} autoFocus placeholder='BSc. Hons in computing'/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
                <FormField
                control={educationForm.control}
                name={`listOfEducation.${index}.schoolName`}
                render={({field})=>(
                    <FormItem>
                        <FormLabel>University || College Name</FormLabel>
                        <FormControl>
                            <Input {...field} autoFocus placeholder='Oxford University'/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
                <div>
                    <div className='grid-cols-12 grid gap-4'>
                        <div className='col-span-12 md:col-span-6'>
                            <FormField
                                control={educationForm.control}
                                name={`listOfEducation.${index}.startDate`}
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>From</FormLabel>
                                        <FormControl>
                                            <Input {...field} type='date'
                                            value={field.value?.slice(0,10)}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>
                        </div>
                        <div className='col-span-12 md:col-span-6'>
                                <FormField
                                control={educationForm.control}
                                name={`listOfEducation.${index}.endDate`}
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>To</FormLabel>
                                        <FormControl>
                                            <Input {...field} type='date'
                                            value={field.value?.slice(0,10)}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>
                        </div>
                    </div>
                    <FormDescription className='pt-1'>
                        *Leave the 
                        <span className='font-semibold'> End Date || To </span> if you are currently working
                    </FormDescription>
                </div>
                <Button variant={'destructive'} type='button'
                    onClick={()=>remove(index)}>
                    <ArchiveX className='size-4'/>
                    Remove
                </Button>
            </div>
        </div>
)

}