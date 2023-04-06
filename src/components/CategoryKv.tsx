import React, { use } from 'react'
import { Breadcrumb } from './Breadcrumb'
import style from './CategoryKv.module.scss'
import { MICROCMS_CONTENTS_TYPE_CATEGORIES } from '@/constants'
import { MicroCMSCategoryData } from '@/lib/microcms'
import { getMicroCMSData } from '@/lib/microcms/getData'

type Props = {
  category: string
}

export const CategoryKv: React.FC<Props> = ({ category }) => {
  const categoriesData: MicroCMSCategoryData = use(
    getMicroCMSData(MICROCMS_CONTENTS_TYPE_CATEGORIES),
  )
  const categoryData = categoriesData.contents.filter((content) => content.english === category)
  const titleEn = categoryData[0]?.english || 'all'
  const titleJa = categoryData[0]?.japanese || 'すべての記事'

  const breadcrumb = [
    {
      url: '/',
      name: 'ホーム',
    },
    {
      url: titleEn,
      name: titleJa,
    },
  ]

  return (
    <div className={style.container}>
      <h1 className={style.title}>
        <span className={style.titleEn}>{titleEn}</span>
        <span className={style.titleJa}>{titleJa}</span>
      </h1>
      <Breadcrumb breadcrumb={breadcrumb} />
    </div>
  )
}
