import Link from 'next/link'
import React, { use } from 'react'
import { Keyword } from './Keyword'
import style from './Sidebar.module.scss'
import { SidebarCategory } from './SidebarCategory'
import { SidebarKeyword } from './SidebarKeyword'
import { MicroCMSCategoryData, MicroCMSKeywordsData } from '@/lib/microcms'
import { getMicroCMSData } from '@/lib/microcms/getData'

export const Sidebar: React.FC = () => {
  const categoriesData: MicroCMSCategoryData = use(getMicroCMSData('categories'))
  const keywordsData: MicroCMSKeywordsData = use(getMicroCMSData('keywords'))
  return (
    <div className={style.container}>
      <SidebarCategory />
      <SidebarKeyword />
    </div>
  )
}
