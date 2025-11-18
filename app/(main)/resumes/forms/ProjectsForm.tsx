import { Button } from '@/components/ui/button'
import { EditorProps } from '@/lib/type'
import { projectsSchema, ProjectValues } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useRef, useState } from 'react'
import { FormProvider, useFieldArray, useForm, UseFormReturn } from 'react-hook-form'
import CollapseButton from '../CollapseButton'
import { ArchiveX, GripHorizontal } from 'lucide-react'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { closestCenter, DndContext, DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { CSS } from '@dnd-kit/utilities'
import { cn } from '@/lib/utils'

export default function ProjectsForm({resumeData, setResumeData}:EditorProps) {

    const projectForm = useForm<ProjectValues>({
        resolver : zodResolver(projectsSchema),
        defaultValues:{
            listOfProjects : resumeData.listOfProjects ?? []
        }
    })

    useEffect(()=>{
        const {unsubscribe} = projectForm.watch(async (item)=>{
            const valid = await projectForm.trigger()
            if(!valid) return
            setResumeData({
                ...resumeData,
                listOfProjects : item.listOfProjects?.filter(i => i!==undefined) || []
            })
        })
        return unsubscribe
    },[projectForm, resumeData, setResumeData])

    const {fields, append, remove, move} = useFieldArray({
        control : projectForm.control,
        name : 'listOfProjects'
    })

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
            <h2>Projects</h2>
            <p>Showcase the projects you’ve worked on with meaningful impact.</p>
        </div>
        <FormProvider {...projectForm}>
            <form className='space-y-4'>
                <DndContext sensors={sensors} collisionDetection={closestCenter}
                    onDragEnd={handleDragEvent} modifiers={[restrictToVerticalAxis]}>
                    <SortableContext items={fields} 
                    strategy={verticalListSortingStrategy}>
                        {fields.map((item, index)=>(
                            <ProjectForm key={item.id} 
                            index={index}
                            projectForm={projectForm}
                            id={item.id}
                            remove={remove}
                            />
                        ))}
                    </SortableContext>
                </DndContext>


                <div className='flex justify-center'>
                    <Button type='button'
                    onClick={()=>append({
                        projectName : '',
                        projectLink : '',
                        description : ''
                    })}>
                        Add Project
                    </Button>
                </div>
            </form>
        </FormProvider>
    </div>
  )
}

interface ProjectProps {
    id: string
    projectForm : UseFormReturn<ProjectValues>
    index : number
    remove : (index : number) => void
}

function ProjectForm({index, id, projectForm, remove}:ProjectProps){
    const [expand, setExpand] = useState(false)
    const divRef = useRef<HTMLDivElement>(null)

    const {attributes, setNodeRef, listeners, transform, transition, isDragging} = useSortable({id})
    
    return(
        <div ref={setNodeRef} className={cn('border rounded bg-(--background) p-4', isDragging && 'shadow-2xl scale-90 transition-transform relative z-10')}
        style={{transform: CSS.Transform.toString(transform), transition}}>
            <div className='flex justify-between'>
                <CollapseButton title={`Project ${index+1}`} reference={divRef}
                expand={expand} setExpand={setExpand}/>
                <GripHorizontal className='size-4 cursor-grab text-(--muted-foreground) outline-0'
                {...attributes} {...listeners}/>
            </div>
            <div ref={divRef} className='space-y-4 overflow-hidden h-0'>
                <FormField 
                control={projectForm.control}
                name={`listOfProjects.${index}.projectName`}
                render={({field})=>(
                    <FormItem className='pt-4'>
                        <FormLabel>Project Title</FormLabel>
                        <FormControl>
                            <Input {...field} autoFocus placeholder='Project Name'/>
                        </FormControl>
                        <FormDescription>
                            Choose a project that reflects the skills required for the role you’re applying for.
                        </FormDescription>
                        <FormMessage/>
                    </FormItem>
                )}/>
                <FormField 
                control={projectForm.control}
                name={`listOfProjects.${index}.projectLink`}
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Link</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder='https://example-project.com'/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
                <FormField 
                control={projectForm.control}
                name={`listOfProjects.${index}.projectLink`}
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Project Link</FormLabel>
                        <FormControl>
                            <Textarea {...field} placeholder='Description of project, Technology use, your learn lesson and etc'/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
                <Button type='button' variant={'destructive'}
                onClick={()=>remove(index)}>
                    <ArchiveX className='size-4'/>
                    Remove
                </Button>
            </div>
        </div>
    )
}