import React, { use } from 'react'
import { Breadcrumb } from './Breadcrumb'
import style from './CategoryKv.module.scss'
import { MicroCMSCategoryData } from '@/lib/microcms'
import { getMicroCMSData } from '@/lib/microcms/getData'

type Props = {
  category: string
}

export const CategoryKv: React.FC<Props> = ({ category }) => {
  const categoriesDta: MicroCMSCategoryData = use(getMicroCMSData('categories'))
  const categoryData = categoriesDta.contents.filter((content) => content.english === category)

  const breadcrumb = [
    {
      url: '/',
      name: 'ホーム',
    },
    {
      url: categoryData[0].english,
      name: categoryData[0].japanese,
    },
  ]

  return (
    <div className={style.container}>
      <h1 className={style.title}>
        <span className={style.titleEn}>{categoryData[0].english}</span>
        <span className={style.titleJa}>{categoryData[0].japanese}</span>
      </h1>
      <Breadcrumb breadcrumb={breadcrumb} />
    </div>
  )
}
