import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import style from './PostNewItem.module.scss'
import { MicroCMSContent, MicroCMSContentsData } from '@/lib/microcms'
import { formatDate } from '@/lib/microcms/dayjs'
import titleStyle from '@/styles/Title.module.scss'

type Props = MicroCMSContent

export const PostNewItem: React.FC<{ content: Props }> = ({ content }) => {
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
          <time className={style.itemContentDate}>{formatDate(content.publishedAt)}</time>
          <p className={`${titleStyle.jaMd} ${style.itemContentTitle}`}>{content.title}</p>
        </div>
      </Link>
    </li>
  )
}
