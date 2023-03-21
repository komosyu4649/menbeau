import style from './HeaderKeywordMenu.module.scss'
import { Keyword } from './Keyword'
import { useHeaderMenuHidden } from '@/hooks/useHeaderMenuHidden'
import microCMSKeywordData from 'public/json/microCMSKeywordData.json'

export const HeaderKeywordMenu = () => {
  const { handleClickVisibleMenu } = useHeaderMenuHidden()

  return (
    <div className={style.container}>
      <ul className={style.list}>
        {microCMSKeywordData.contents.map((content) => (
          <li key={content.id} className={style.item}>
            <Keyword
              id={content.id}
              name={content.name}
              color='white'
              onClick={handleClickVisibleMenu}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
