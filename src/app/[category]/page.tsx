import React from 'react'
import { getMicroCMSData } from '@/lib/microcms/getData'

export async function generateStaticParams() {
  const postsDta = await getMicroCMSData('categories')
  return postsDta.contents.map((content) => ({
    category: content.english,
  }))
}

export default async function Category() {
  return <div>page</div>
}
