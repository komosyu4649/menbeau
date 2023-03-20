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
  const contentsData = await getMicroCMSDataList('contents')
  const { totalCount } = contentsData
  const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i)
  const paths = range(1, Math.ceil(totalCount / PER_PAGE)).map((repo) => `${repo}`)
  const categoriesData: MicroCMSCategoryData = await getMicroCMSData('categories')
  const categoryParams = categoriesData.contents.flatMap((content) =>
    range(1, Math.ceil(totalCount / PER_PAGE)).map((number) => ({
      category: content.english,
      number: number.toString(),
    })),
  )
  return categoryParams
}

type Props = {
  category: string
  number: string
}

export default async function Category({ params }: { params: Props }) {
  // console.log(params)
  const { category, number } = params
  const currentNumber = Number(number)
  const categoryName: string = category || 'all'
  const categoriesData: MicroCMSCategoryData = await getMicroCMSData('categories')
  const categoryData = categoriesData.contents.filter((content) => content.english === category)
  const categoryId = categoryData[0].id
  const contentsData: MicroCMSContentsData = await getMicroCMSDataList(
    'contents',
    (currentNumber - 1) * PER_PAGE,
    PER_PAGE,
    categoryId,
  )
  const { contents, totalCount } = contentsData

  const categoryContentCount = await getCategoryContentCount('contents', category)

  // const categoryFilteredContents = (categoryName: string) =>
  //   contents.filter((content) => categoryName === content.category?.english)

  return (
    <div className={`${style.container} ${layoutStyle.lg}`}>
      <CategoryKv category={category} />
      <div className={style.main}>
        <Sidebar />
        <div className={style.mainContents}>
          <CategoryMain
            contents={
              contents
              // categoryFilteredContents(categoryName).length === 0
              //   ? contents
              //   : categoryFilteredContents(categoryName)
            }
            categoryName={categoryName}
          />
          <div className={style.mainContentsPagination}>
            <Pagination
              totalCount={categoryContentCount || totalCount}
              pageName={categoryName}
              currentNumber={currentNumber}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
