import React, { use } from 'react'
import { Keyword } from './Keyword'
import style from './SidebarKeyword.module.scss'
import { MicroCMSKeywordsData } from '@/lib/microcms'
import { getMicroCMSData } from '@/lib/microcms/getData'

export const SidebarKeyword = () => {
  const keywordsData: MicroCMSKeywordsData = use(getMicroCMSData('keywords'))
  return (
    <nav>
      <h2 className={style.title}>keywords</h2>
      <div className={style.menu}>
        <ul className={style.menuList}>
          {keywordsData.contents.map((keyword) => (
            <li key={keyword.id} className={style.menuItem}>
              <Keyword id={keyword.id} name={keyword.name} color='black' />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
