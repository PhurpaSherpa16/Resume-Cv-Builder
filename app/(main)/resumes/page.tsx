import { Button } from '@/components/ui/button'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata : Metadata ={
  title : 'New Resume'
}

export default function page() {
  return (
    <main className='container py-8 space-y-4'>
      <h1>Welcome</h1>
      <Button asChild>
        <Link href={'/resume-editor'}>
          New Resume
        </Link>
      </Button>
    </main>
  )
}
