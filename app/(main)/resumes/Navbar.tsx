import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <header className='border-b'>
        <div className='container py-4 flex  items-center justify-between'>
          <div className='flex items-end gap-2'>
            <Link href={'/resumes'}>
              <div className='size-12 bg-gray-300 rounded'></div>
              <span className='font-semibold'>Resume Builder</span>
            </Link>
          </div>
          <div>
            <Button variant={'secondary'}>
              <LogOut className='size-4'/>
              Logout
            </Button>
          </div>
        </div>
    </header>
  )
}
