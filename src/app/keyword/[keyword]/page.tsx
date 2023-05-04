import React, { use } from 'react'
import style from './page.module.scss'
import { CategoryMain } from '@/components/CategoryMain'
import { KeywordKv } from '@/components/KeywordKv'
import { Sidebar } from '@/components/Sidebar'
import { MICROCMS_CONTENTS_TYPE_CONTENTS, MICROCMS_CONTENTS_TYPE_KEYWORDS } from '@/constants'
import { MicroCMSContentsData, MicroCMSKeywordsData } from '@/lib/microcms'
import { getMicroCMSData } from '@/lib/microcms/getData'
import layoutStyle from '@/styles/Layout.module.scss'

export async function generateStaticParams() {
  const keywordsData: MicroCMSKeywordsData = await getMicroCMSData(MICROCMS_CONTENTS_TYPE_KEYWORDS)
  return keywordsData.contents.map((content) => ({
    keyword: content.id,
  }))
}

export async function generateMetadata({ params }: { params: { keyword: string } }) {
  const { keyword } = params
  const keywordsData: MicroCMSKeywordsData = await getMicroCMSData(MICROCMS_CONTENTS_TYPE_KEYWORDS)
  const keywordData = keywordsData.contents.filter((content) => content.id === keyword)
  const titleName = keywordData[0].name
  return {
    title: `${titleName}に関する記事一覧`,
    description: `${titleName}に関する記事一覧です`,
  }
}

export default async function Keyword({ params }: { params: { keyword: string } }) {
  const { keyword } = params
  const contentData: MicroCMSContentsData = await getMicroCMSData(MICROCMS_CONTENTS_TYPE_CONTENTS)
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
    <div className={`${layoutStyle.lg} ${style.container}`}>
      <KeywordKv keyword={keyword} />
      <div className={style.main}>
        <Sidebar />
        <CategoryMain contents={keywordFilteredContents(keyword)} categoryName='all' />
      </div>
    </div>
  )
}
