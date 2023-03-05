import React from 'react'
import { CategoryKv } from '@/components/CategoryKv'
import { MicroCMSCategoryData } from '@/lib/microcms'
import { getMicroCMSData } from '@/lib/microcms/getData'

export async function generateStaticParams() {
  const categoriesDta: MicroCMSCategoryData = await getMicroCMSData('categories')
  return categoriesDta.contents.map((content) => ({
    category: content.english,
  }))
}

export default async function Category({ params }: { params: { category: string } }) {
  const { category } = params
  return (
    <div>
      <CategoryKv category={category} />
    </div>
  )
}
