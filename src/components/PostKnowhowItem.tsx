import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import style from './PostKnowhowItem.module.scss'
import { MicroCMSContent } from '@/lib/microcms'
import titleStyle from '@/styles/Title.module.scss'

type Props = MicroCMSContent

export const PostKnowhowItem: React.FC<{ content: Props }> = ({ content }) => {
  return (
    <li key={content.id} className={style.item}>
      <Link href={content.id} className={style.itemLink}>
        <Image
          className={style.itemImage}
          src={content.thumbnail.url}
          alt={content.title}
          width={content.thumbnail.width}
          height={content.thumbnail.height}
        />
        <div className={style.itemContent}>
          <h2 className={`${titleStyle.jaMd} ${style.itemContentTitle}`}>{content.title}</h2>
        </div>
      </Link>
    </li>
  )
}