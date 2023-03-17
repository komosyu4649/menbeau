import React, { use } from 'react'
import { Breadcrumb } from './Breadcrumb'
import style from './KeywordKv.module.scss'
import { MicroCMSKeywordsData } from '@/lib/microcms'
import { getMicroCMSData } from '@/lib/microcms/getData'
import titleStyle from '@/styles/Title.module.scss'

type Props = {
  keyword: string
}

export const KeywordKv: React.FC<Props> = ({ keyword }) => {
  const keywordsData: MicroCMSKeywordsData = use(getMicroCMSData('keywords'))
  const keywordData = keywordsData.contents.filter((content) => content.id === keyword)
  const titleName = keywordData[0].name
  const url = keywordData[0].id

  const breadcrumb = [
    {
      url: '/',
      name: 'ホーム',
    },
    {
      url: url,
      name: titleName,
    },
  ]

  return (
    <div className={style.container}>
      <h1 className={style.title}>
        <span className={style.titleEn}>keyword</span>
        <span className={style.titleJa}>
          <span className={`${titleStyle.borderLg} ${style.titleJaKeyword}`}>{titleName}</span>
          に関する記事
        </span>
      </h1>
      <Breadcrumb breadcrumb={breadcrumb} />
    </div>
  )
}
