import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import style from './PostInterviewItem.module.scss'
import { MicroCMSContent } from '@/lib/microcms'
import titleStyle from '@/styles/Title.module.scss'

type Props = MicroCMSContent

export const PostInterviewItem: React.FC<{ content: Props }> = ({ content }) => {
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
        <div className={style.itemImageContent}>
          <h2 className={`${titleStyle.jaMd} ${style.itemImageContentTitle}`}>{content.title}</h2>
          <div className={style.itemImageContentProfile}>
            <Image
              className={style.itemImageContentProfileImage}
              src={content.interviewee?.icon.url}
              alt={content.interviewee?.name}
              width={content.interviewee?.icon.width}
              height={content.interviewee?.icon.height}
            />
            <span className={style.itemImageContentProfileName}>{content.interviewee?.name}</span>
          </div>
        </div>
      </Link>
    </li>
  )
}
