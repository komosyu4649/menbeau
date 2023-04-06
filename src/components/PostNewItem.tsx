import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import style from './PostNewItem.module.scss'
import { formatDate } from '@/lib/dayjs'
import { MicroCMSContent } from '@/lib/microcms'
import titleStyle from '@/styles/Title.module.scss'

type Props = MicroCMSContent

export const PostNewItem: React.FC<{ content: Props }> = ({ content }) => {
  return (
    <Link href={`/${content.category.english}/${content.id}`} className={style.itemLink}>
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
  )
}
