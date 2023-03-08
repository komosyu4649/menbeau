import Link from 'next/link'
import React from 'react'
import style from './Breadcrumb.module.scss'

type Props = {
  url: string
  name: string
}[]

export const Breadcrumb = ({ breadcrumb }: { breadcrumb: Props }) => {
  return (
    <nav className={style.container}>
      <ul className={style.list}>
        {breadcrumb.map((item) => (
          <li key={item.url} className={style.item}>
            <Link href={item.url} className={style.itemLink}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
