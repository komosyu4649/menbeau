import Link from 'next/link'
import React from 'react'
import style from './Footer.module.scss'

export const Footer: React.FC = () => {
  type Menu = {
    href: string
    name: string
  }
  const menus: Menu[] = [
    { href: '/', name: 'ホーム' },
    { href: '/about/', name: 'MENBIYOについて' },
    { href: '/contact/', name: 'お問い合わせ' },
  ]
  return (
    <footer className={style.container}>
      <nav className={style.menu}>
        <ul className={style.menuList}>
          {menus.map((menu) => (
            <li key={menu.name} className={style.menuItem}>
              <Link href={menu.href} className={style.menuItemLink}>
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <small className={style.copy}>copyright@2023 MENBIYO</small>
    </footer>
  )
}
