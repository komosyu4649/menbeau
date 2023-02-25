import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import style from './PostProgressItem.module.scss'
import { formatDate } from '@/lib/dayjs'
import { MicroCMSContent } from '@/lib/microcms'
import titleStyle from '@/styles/Title.module.scss'

type Props = MicroCMSContent

export const PostProgressItem: React.FC<{ content: Props }> = ({ content }) => {
  return (
    <li key={content.id} className={style.item}>
      <Link href='' className={style.itemLink}>
        <Image
          className={style.itemImage}
          src={content.thumbnail.url}
          alt={content.title}
          width={content.thumbnail.width}
          height={content.thumbnail.height}
        />
        <time className={`${titleStyle.jaMd} ${style.itemDate}`}>
          {formatDate(content.publishedAt)}
        </time>
      </Link>
    </li>
  )
}
