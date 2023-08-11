import Link from 'next/link'
import React from 'react'
import style from './Footer.module.scss'

export const Footer: React.FC = () => {
  type Menu = {
    href: string
    target?: boolean
    name: string
  }
  const menus: Menu[] = [
    { href: '/', name: 'ホーム' },
    { href: '/about/', name: 'MENBIYOについて' },
    {
      href: 'https://twitter.com/messages/compose?recipient_id=1583786873821966336',
      target: true,
      name: 'お問い合わせ',
    },
  ]
  return (
    <footer className={style.container}>
      <nav className={style.menu}>
        <ul className={style.menuList}>
          {menus.map((menu) => (
            <li key={menu.name} className={style.menuItem}>
              {menu.target ? (
                <a href={menu.href} target='_blank' className={style.menuItemLink}>
                  {menu.name}
                </a>
              ) : (
                <Link href={menu.href} className={style.menuItemLink}>
                  {menu.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <small className={style.copy}>copyright@2023 MENBIYO</small>
    </footer>
  )
}
