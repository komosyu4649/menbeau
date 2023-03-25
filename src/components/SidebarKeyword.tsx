'use client'

import React, { use } from 'react'
import { Keyword } from './Keyword'
import style from './SidebarKeyword.module.scss'
import { useAccordion } from '@/hooks/useAccordion'
import microCMSKeywordData from 'public/json/microCMSKeywordData.json'

export const SidebarKeyword: React.FC = () => {
  const { isOpen, setIsOpen, accordionRef } = useAccordion()

  return (
    <nav className={`${style.container} ${isOpen ? style.stateOpen : style.stateClose}`}>
      <h2
        className={style.title}
        onClick={() => setIsOpen(!isOpen)}
        aria-controls='sidebarKeyword'
        aria-expanded={!isOpen}
      >
        keywords
      </h2>
      <div className={style.menu} ref={accordionRef} id='sidebarKeyword' aria-hidden={!isOpen}>
        <div className={style.menuInner}>
          <ul className={style.menuList}>
            {microCMSKeywordData.contents.map((keyword) => (
              <li key={keyword.id} className={style.menuItem}>
                <Keyword id={keyword.id} name={keyword.name} color='black' />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
