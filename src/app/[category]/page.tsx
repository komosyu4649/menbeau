import React from 'react'
import style from './page.module.scss'
import { CategoryKv } from '@/components/CategoryKv'
import { CategoryMain } from '@/components/CategoryMain'
import { Sidebar } from '@/components/Sidebar'
import { MicroCMSCategoryData } from '@/lib/microcms'
import { getMicroCMSData } from '@/lib/microcms/getData'
import layoutStyle from '@/styles/Layout.module.scss'

export async function generateStaticParams() {
  const categoriesDta: MicroCMSCategoryData = await getMicroCMSData('categories')
  return categoriesDta.contents.map((content) => ({
    category: content.english || 'all',
  }))
}

export default async function Category({ params }: { params: { category: string } }) {
  const { category } = params
  // console.log(category)
  const categoryName: string = category || 'all'
  const contentsData: MicroCMSCategoryData = await getMicroCMSData('contents')
  const { contents } = contentsData
  // console.log(contents)
  const categoryFilteredContents = (categoryName: string) =>
    contents.filter((content) => content.category?.english || 'all' === categoryName)
  // console.log(categoryFilteredContents(categoryName))
  return (
    <div className={layoutStyle.lg}>
      <CategoryKv category={category} />
      <div className={style.main}>
        <Sidebar />
        <CategoryMain
          contents={categoryFilteredContents(categoryName)}
          categoryName={categoryName}
        />
      </div>
    </div>
  )
}
