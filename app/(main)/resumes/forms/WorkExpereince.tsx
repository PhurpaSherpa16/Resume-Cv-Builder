import { Button } from '@/components/ui/button'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { EditorProps } from '@/lib/type'
import { workExpereinceSchema, WorkExperienceValues } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArchiveX, GripHorizontal } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { FormProvider, useFieldArray, useForm, UseFormReturn } from 'react-hook-form'
import CollapseButton from '../CollapseButton'
import { closestCenter, DndContext, DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import {CSS} from '@dnd-kit/utilities'
import { cn } from '@/lib/utils'



export default function WorkExpereince({resumeData, setResumeData}:EditorProps) {
    const workExpForm = useForm<WorkExperienceValues>({
        resolver : zodResolver(workExpereinceSchema),
        defaultValues:{
            listOfWorkExperiences : resumeData.listOfWorkExperiences ?? []
        }
    })

    useEffect(()=>{
        const {unsubscribe} = workExpForm.watch(async (values) =>{
            const valid = await workExpForm.trigger()
            if(!valid) return
            setResumeData({...resumeData, 
                listOfWorkExperiences : values.listOfWorkExperiences?.filter(item=>item!==undefined)|| [],
            })
        })
        return unsubscribe
    },[workExpForm, resumeData, setResumeData])

    // step 1 dnd add move
    const {fields, append, remove, move} = useFieldArray({
        control: workExpForm.control,
        name : 'listOfWorkExperiences'
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
            <h2>Work Expereince</h2>
            <p>Add your previous roles, and responsibilities to strengthen your resume.</p>
        </div>
        <FormProvider {...workExpForm}>
            <form className='space-y-4'>
                <DndContext sensors={sensors} collisionDetection={closestCenter}
                onDragEnd={handleDragEvent} modifiers={[restrictToVerticalAxis]}>
                    <SortableContext items={fields} 
                    strategy={verticalListSortingStrategy}>
                        {fields.map((item, index)=>(
                            <WorkExpereinceItem key={item.id}
                            id={item.id}
                            index={index} 
                            workExpForm={workExpForm}
                            remove={remove}
                            />
                        ))}
                    </SortableContext>
                </DndContext>

                <div className='flex justify-center'>
                    <Button type='button'
                    onClick={()=>append({
                        position : '',
                        company : '',
                        startDate : '',
                        endDate : '',
                        description : ''
                    })}>
                        Add Work Expereinces
                    </Button>
                </div>
            </form>
        </FormProvider>
    </div>
  )
}


// Work experience form
interface WorkExperienceItemProps {
    id : string
    workExpForm: UseFormReturn<WorkExperienceValues>
    index: number
    remove : (index : number) => void
}

function WorkExpereinceItem({id, workExpForm, index, remove}:WorkExperienceItemProps){
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
                control={workExpForm.control}
                name={`listOfWorkExperiences.${index}.position`}
                render={({field})=>(
                    <FormItem className='pt-4'>
                        <FormLabel>JobTitle</FormLabel>
                        <FormControl>
                            <Input {...field} autoFocus placeholder='Frontend Developer'/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
                <FormField
                control={workExpForm.control}
                name={`listOfWorkExperiences.${index}.company`}
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                            <Input {...field} autoFocus placeholder='Green Soft Development Pvt. Ltd.'/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
                <div>
                    <div className='grid-cols-12 grid gap-4'>
                        <div className='col-span-12 md:col-span-6'>
                            <FormField
                                control={workExpForm.control}
                                name={`listOfWorkExperiences.${index}.startDate`}
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
                                control={workExpForm.control}
                                name={`listOfWorkExperiences.${index}.endDate`}
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
                <FormField
                control={workExpForm.control}
                name={`listOfWorkExperiences.${index}.description`}
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Textarea {...field} placeholder='Roles and Responsibilities'/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
                <Button variant={'destructive'} type='button'
                onClick={()=>remove(index)}>
                    <ArchiveX className='size-4'/>
                    Remove
                </Button>
            </div>
        </div>
    )
}