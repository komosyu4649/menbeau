'use client'

import Link from 'next/link'
import React, { use, useEffect, useState } from 'react'
import style from './SidebarCategory.module.scss'
import { BREAK_POINT } from '@/constants'
import { useAccordion } from '@/hooks/useAccordion'
import microCMSCategoryData from 'public/json/microCMSCategoryData.json'

export const SidebarCategory: React.FC = () => {
  // const categoriesData: MicroCMSCategoryData = use(
  //   getMicroCMSData(MICROCMS_CONTENTS_TYPE_CATEGORIES),
  // )

  const { isOpen, setIsOpen, accordionRef } = useAccordion()

  // const [isOpen, setIsOpen] = useState(false)
  // const test = () => {
  //   setIsOpen(!isOpen)
  //   console.log(123, isOpen)
  // }

  const [windowWidth, setWindowWidth] = useState(0)
  useEffect(() => {
    setWindowWidth(window.innerWidth)
    if (windowWidth > BREAK_POINT) {
      setIsOpen(true)
    }
  }, [windowWidth])

  //
  return (
    <nav className={`${style.container} ${isOpen ? style.stateOpen : style.stateClose}`}>
      {windowWidth > BREAK_POINT ? (
        <h2 className={style.title}>Categories</h2>
      ) : (
        <button
          className={style.title}
          onClick={() => setIsOpen(!isOpen)}
          aria-controls='sidebarCategory'
          aria-expanded={!isOpen}
        >
          Categories
        </button>
      )}
      <div className={style.menu} ref={accordionRef} id='sidebarCategory' aria-hidden={!isOpen}>
        <div className={style.menuInner}>
          <ul className={style.menuList}>
            <li className={style.menuItem}>
              <Link href='/all' className={style.menuItemLink}>
                <span className={style.menuItemEn}>all</span>
                <span className={style.menuItemJp}>すべての記事</span>
              </Link>
            </li>
            {microCMSCategoryData.contents.map((category) => (
              <li key={category.id} className={style.menuItem}>
                <Link href={category.english} className={style.menuItemLink}>
                  <span className={style.menuItemEn}>{category.english}</span>
                  <span className={style.menuItemJp}>{category.japanese}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
