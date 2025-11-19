import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import { PopoverContent } from '@radix-ui/react-popover'
import { PaletteIcon } from 'lucide-react'
import { useState } from 'react'
import { HexColorInput, HexColorPicker } from 'react-colorful'

interface ColorProps{
  color : string | undefined
  onChange : (value : string) => void
}

export default function ColorStyle({color, onChange}:ColorProps) {

  const [showPopOver, setPopOver] = useState(false)

  return (
    <Popover open={showPopOver} onOpenChange={setPopOver}>
        <PopoverTrigger asChild>
            <Button variant={'outline'} size={'icon'} title='Change Color'
            onClick={()=>setPopOver(true)} className='cursor-pointer hover:bg-blue-100'>
                <PaletteIcon className='size-4'/>
            </Button>
        </PopoverTrigger>
        <PopoverContent className='bg-transparent border-0 p-0 shadow-none flex flex-col gap-2'>
            <HexColorPicker color={color} onChange={onChange}/>
            <HexColorInput color={color} onChange={onChange} className='bg-gray-50 border w-full p-2 rounded'/>
        </PopoverContent>
    </Popover>
  )
}
