import Link from 'next/link'
import { cache } from 'react'
import style from './HeaderCategoryMenu.module.scss'
import { MicroCMSCategoryData } from '@/lib/microcms'
import { getMicroCMSData } from '@/lib/microcms/getData'

type Props = { categoriesData: MicroCMSCategoryData }

export const HeaderCategoryMenu: React.FC<Props> = ({ categoriesData }) => {
  return (
    <div className={style.container}>
      <ul className={style.list}>
        {categoriesData.contents.map((content) => (
          <li key={content.id} className={style.item}>
            <Link href={content.id} className={style.itemLink}>
              <span className={style.itemEn}>{content.english}</span>
              <span className={style.itemJa}>{content.japanese}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
