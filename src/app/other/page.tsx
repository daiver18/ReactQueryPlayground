import React from 'react'
import Title from '@/components/title'
import List from '@/components/list'
import Link from 'next/link'

export default function Other() {
  return (
    <div>
      Other
      <Link href={"/home"}>Back</Link>
    </div>
  )
}