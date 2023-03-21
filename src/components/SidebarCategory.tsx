import Link from 'next/link'
import React, { use } from 'react'
import style from './SidebarCategory.module.scss'
import { MICROCMS_CONTENTS_TYPE_CATEGORIES } from '@/constants'
import { MicroCMSCategoryData } from '@/lib/microcms'
import { getMicroCMSData } from '@/lib/microcms/getData'

export const SidebarCategory: React.FC = () => {
  const categoriesData: MicroCMSCategoryData = use(
    getMicroCMSData(MICROCMS_CONTENTS_TYPE_CATEGORIES),
  )
  return (
    <nav className={style.container}>
      <h2 className={style.title}>Categories</h2>
      <div className={style.menu}>
        <ul className={style.menuList}>
          {categoriesData.contents.map((category) => (
            <li key={category.id} className={style.menuItem}>
              <Link href={category.english} className={style.menuItemLink}>
                <span className={style.menuItemEn}>{category.english}</span>
                <span className={style.menuItemJp}>{category.japanese}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
