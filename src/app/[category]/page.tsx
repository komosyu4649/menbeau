import React from 'react'
import style from './page.module.scss'
import { CategoryKv } from '@/components/CategoryKv'
import { CategoryMain } from '@/components/CategoryMain'
import { Sidebar } from '@/components/Sidebar'
import { MicroCMSCategoryData, MicroCMSContentsData } from '@/lib/microcms'
import { getMicroCMSData } from '@/lib/microcms/getData'
import layoutStyle from '@/styles/Layout.module.scss'

export async function generateStaticParams() {
  const categoriesData: MicroCMSCategoryData = await getMicroCMSData('categories')
  return categoriesData.contents.map((content) => ({
    // category: content.english || 'all',
    category: content.english,
  }))
}

export default async function Category({ params }: { params: { category: string } }) {
  const { category } = params
  // const categoryName: string = category || 'all'
  const categoryName: string = category
  const contentsData: MicroCMSContentsData = await getMicroCMSData('contents')
  const { contents } = contentsData
  const categoryFilteredContents = (categoryName: string) =>
    contents.filter((content) => categoryName === content.category?.english)

  return (
    <div className={layoutStyle.lg}>
      <CategoryKv category={category} />
      <div className={style.main}>
        <Sidebar />
        <CategoryMain
          contents={
            categoryFilteredContents(categoryName).length === 0
              ? contents
              : categoryFilteredContents(categoryName)
          }
          categoryName={categoryName}
        />
      </div>
    </div>
  )
}
