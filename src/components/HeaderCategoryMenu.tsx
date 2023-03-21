import Link from 'next/link'
import { use, useCallback, useState } from 'react'
import { useRecoilState } from 'recoil'
import style from './HeaderCategoryMenu.module.scss'
import { useHeaderMenuHidden } from '@/hooks/useHeaderMenuHidden'
import { MicroCMSCategoryData } from '@/lib/microcms'
import { getMicroCMSData } from '@/lib/microcms/getData'
import { headerMenuOpen } from '@/store/headerMenuState'
import microCMSCategoryData from 'public/json/microCMSCategoryData.json'

export const HeaderCategoryMenu = () => {
  const { handleClickVisibleMenu } = useHeaderMenuHidden()

  return (
    <div className={style.container}>
      <ul className={style.list}>
        <li className={style.item}>
          <Link href='/all' className={style.itemLink} onClick={handleClickVisibleMenu}>
            <span className={style.itemEn}>all</span>
            <span className={style.itemJa}>すべての記事</span>
          </Link>
        </li>
        {microCMSCategoryData.contents.map((content) => (
          <li key={content.id} className={style.item}>
            <Link
              href={content.english}
              className={style.itemLink}
              onClick={handleClickVisibleMenu}
            >
              <span className={style.itemEn}>{content.english}</span>
              <span className={style.itemJa}>{content.japanese}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
