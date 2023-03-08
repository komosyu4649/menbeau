import React from 'react'
import style from './page.module.scss'
import { CategoryKv } from '@/components/CategoryKv'
import { Sidebar } from '@/components/Sidebar'
import { MicroCMSCategoryData } from '@/lib/microcms'
import { getMicroCMSData } from '@/lib/microcms/getData'
import layoutStyle from '@/styles/Layout.module.scss'

export async function generateStaticParams() {
  const categoriesDta: MicroCMSCategoryData = await getMicroCMSData('categories')
  return categoriesDta.contents.map((content) => ({
    category: content.english,
  }))
}

export default async function Category({ params }: { params: { category: string } }) {
  const { category } = params
  return (
    <div className={layoutStyle.lg}>
      <CategoryKv category={category} />
      <div className={style.main}>
        <Sidebar />
      </div>
    </div>
  )
}
