import Link from 'next/link'
import React from 'react'
import style from './Keyword.module.scss'

type Props = {
  id: string
  name: string
  color: 'black' | 'white'
}

export const Keyword: React.FC<Props> = (props) => {
  const { id, color, name } = props
  const selectColor = (color: string) => {
    switch (color) {
      case 'black':
        return style.black
      case 'white':
        return style.white
    }
  }
  return (
    <Link href={`/${id}`} className={`${selectColor(color)} ${style.main}`}>
      {name}
    </Link>
  )
}
