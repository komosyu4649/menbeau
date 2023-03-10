import Link from 'next/link'
import { use } from 'react'
import style from './HeaderCategoryMenu.module.scss'
import { MicroCMSCategoryData } from '@/lib/microcms'
import { getMicroCMSData } from '@/lib/microcms/getData'
import microCMSCategoryData from 'public/json/microCMSCategoryData.json'

export const HeaderCategoryMenu = () => {
  // const categoriesData: MicroCMSCategoryData = use(getMicroCMSData('categories'))

  return (
    <div className={style.container}>
      <ul className={style.list}>
        {microCMSCategoryData.contents.map((content) => (
          <li key={content.id} className={style.item}>
            <Link href={content.english} className={style.itemLink}>
              <span className={style.itemEn}>{content.english}</span>
              <span className={style.itemJa}>{content.japanese}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
