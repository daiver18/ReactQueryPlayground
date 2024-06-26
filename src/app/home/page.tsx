import React from 'react'
import Title from '@/components/title'
import List from '@/components/list'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Title />
      <List />
      <Link href={"/other"}>other</Link>
    </div>
  )
}