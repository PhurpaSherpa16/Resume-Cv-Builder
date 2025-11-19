import { Button } from '@/components/ui/button'
import { Circle, Square, Squircle } from 'lucide-react'

interface BorderStyleProps{
    borderStyle : string | undefined
    onChange : (borderStyle : string) => void
}

export const BorderStyles = {
    Square : 'square',
    Circle : 'circle',
    SQuicle : 'squircle'
}

const borderStyles = Object.values(BorderStyles)


export default function BorderStyleButton({borderStyle, onChange}:BorderStyleProps) {

    const handleClick = () =>{
        const currentIndex = borderStyle ? borderStyles.indexOf(borderStyle) : 0
        const nextIndex = (currentIndex + 1) % borderStyles.length
        onChange(borderStyles[nextIndex])
    }

    const Icon = borderStyle === 'square' ? Square 
                : borderStyle === 'circle' ? Circle
                : Squircle

  return (
    <Button variant={'outline'} size={'icon'} title='Change border Style'
    onClick={handleClick}>
        <Icon className='size-4'/>
    </Button>
  )
}
