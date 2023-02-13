import style from './HeaderKeywordMenu.module.scss'
import { Keyword } from './Keyword'
import { MicroCMSKeywordsData } from '@/lib/microcms'
import { getMicroCMSData } from '@/lib/microcms/getData'

type Props = { keywordsData: MicroCMSKeywordsData }

export const HeaderKeywordMenu: React.FC<Props> = ({ keywordsData }) => {
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
