'use client'

import React, { use, useEffect, useState } from 'react'
import { Keyword } from './Keyword'
import style from './SidebarKeyword.module.scss'
import { BREAK_POINT } from '@/constants'
import { useAccordion } from '@/hooks/useAccordion'
import microCMSKeywordData from 'public/json/microCMSKeywordData.json'

export const SidebarKeyword: React.FC = () => {
  const { isOpen, setIsOpen, accordionRef } = useAccordion()

  const [windowWidth, setWindowWidth] = useState(0)
  useEffect(() => {
    setWindowWidth(window.innerWidth)
    if (windowWidth > BREAK_POINT) {
      setIsOpen(true)
    }
  }, [windowWidth])

  return (
    <nav className={`${style.container} ${isOpen ? style.stateOpen : style.stateClose}`}>
      {windowWidth > BREAK_POINT ? (
        <h2 className={style.title}>keywords</h2>
      ) : (
        <button
          className={style.title}
          onClick={() => setIsOpen(!isOpen)}
          aria-controls='sidebarCategory'
          aria-expanded={!isOpen}
        >
          keywords
        </button>
      )}
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
