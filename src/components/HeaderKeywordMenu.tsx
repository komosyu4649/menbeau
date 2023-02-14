import { use } from 'react'
import style from './HeaderKeywordMenu.module.scss'
import { Keyword } from './Keyword'
import { MicroCMSKeywordsData } from '@/lib/microcms'
import { getMicroCMSData } from '@/lib/microcms/getData'

export const HeaderKeywordMenu: React.FC = () => {
  const keywordsData: MicroCMSKeywordsData = use(getMicroCMSData('keywords'))

  return (
    <div className={style.container}>
      <ul className={style.list}>
        {keywordsData.contents.map((content) => (
          <li key={content.id} className={style.item}>
            <Keyword id={content.id} name={content.name} />
          </li>
        ))}
      </ul>
    </div>
  )
}
