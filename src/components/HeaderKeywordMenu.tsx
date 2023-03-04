import { use } from 'react'
import style from './HeaderKeywordMenu.module.scss'
import { Keyword } from './Keyword'
import { MicroCMSKeywordsData } from '@/lib/microcms'
import { getMicroCMSData } from '@/lib/microcms/getData'
import microCMSKeywordData from 'public/json/microCMSKeywordData.json'

export const HeaderKeywordMenu = () => {
  // const keywordsData: MicroCMSKeywordsData = use(getMicroCMSData('keywords'))

  return (
    <div className={style.container}>
      <ul className={style.list}>
        {microCMSKeywordData.contents.map((content) => (
          <li key={content.id} className={style.item}>
            <Keyword id={content.id} name={content.name} color='white' />
          </li>
        ))}
      </ul>
    </div>
  )
}
