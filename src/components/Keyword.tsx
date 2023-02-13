import Link from 'next/link'
import React from 'react'
import style from './Keyword.module.scss'
import { notoSans } from '@/app/layout'

type Props = {
  id: string
  name: string
}

export const Keyword: React.FC<Props> = (props) => {
  return (
    <Link href={props.id} className={style.main}>
      {props.name}
    </Link>
  )
}
