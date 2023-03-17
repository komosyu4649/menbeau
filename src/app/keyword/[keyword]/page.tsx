import React from 'react'
import style from './page.module.scss'
import { CategoryMain } from '@/components/CategoryMain'
import { KeywordKv } from '@/components/KeywordKv'
import { Sidebar } from '@/components/Sidebar'
import { MicroCMSContentsData, MicroCMSKeywordsData } from '@/lib/microcms'
import { getMicroCMSData } from '@/lib/microcms/getData'
import layoutStyle from '@/styles/Layout.module.scss'

export async function generateStaticParams() {
  const keywordsData: MicroCMSKeywordsData = await getMicroCMSData('keywords')
  return keywordsData.contents.map((content) => ({
    keyword: content.id,
  }))
}

export default async function Keyword({ params }: { params: { keyword: string } }) {
  const { keyword } = params
  const contentData: MicroCMSContentsData = await getMicroCMSData('contents')
  const { contents } = contentData
  const keywordFilteredContents = (keyword: string) =>
    contents.filter((content) =>
      content.keywords
        .map((contentKeyword) => {
          return contentKeyword.id
        })
        .includes(keyword),
    )
  return (
    <div className={layoutStyle.lg}>
      <KeywordKv keyword={keyword} />
      <div className={style.main}>
        <Sidebar />
        <CategoryMain contents={keywordFilteredContents(keyword)} categoryName='all' />
      </div>
    </div>
  )
}
