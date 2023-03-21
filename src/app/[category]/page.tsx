import React from 'react'
import style from './page.module.scss'
import { CategoryKv } from '@/components/CategoryKv'
import { CategoryMain } from '@/components/CategoryMain'
import { Pagination } from '@/components/Pagination'
import { Sidebar } from '@/components/Sidebar'
import { PER_PAGE } from '@/constants'
import { MicroCMSCategoryData, MicroCMSContentsData } from '@/lib/microcms'
import {
  getCategoryContentCount,
  getMicroCMSData,
  getMicroCMSDataList,
} from '@/lib/microcms/getData'
import layoutStyle from '@/styles/Layout.module.scss'

export async function generateStaticParams() {
  const categoriesData: MicroCMSCategoryData = await getMicroCMSData('categories')
  return categoriesData.contents.map((content) => ({
    category: content.english,
  }))
}

export default async function Category({ params }: { params: { category: string } }) {
  const { category } = params
  const categoryName: string = category || 'all'
  const categoriesData: MicroCMSCategoryData = await getMicroCMSData('categories')
  const categoryData = categoriesData.contents.filter((content) => content.english === category)
  const categoryId = categoryData[0]?.id
  const contentsData: MicroCMSContentsData = await getMicroCMSDataList(
    'contents',
    0,
    PER_PAGE,
    categoryId,
  )
  const { contents, totalCount } = contentsData

  return (
    <div className={`${style.container} ${layoutStyle.lg}`}>
      <CategoryKv category={category} />
      <div className={style.main}>
        <Sidebar />
        <div className={style.mainContents}>
          <CategoryMain contents={contents} categoryName={categoryName} />
          <div className={style.mainContentsPagination}>
            <Pagination totalCount={totalCount} pageName={categoryName} currentNumber={1} />
          </div>
        </div>
      </div>
    </div>
  )
}
