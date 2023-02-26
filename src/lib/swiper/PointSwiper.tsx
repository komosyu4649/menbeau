'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { MicroCMSContentsData } from '../microcms'
import style from './PointSwiper.module.scss'
import textStyle from '@/styles/Text.module.scss'

type Props = MicroCMSContentsData

export const PointSwiper: React.FC<Props> = ({ contents }) => {
  return (
    <Swiper slidesPerView={1}>
      {contents.flatMap(
        (content) =>
          content.pickup && (
            <li key={content.id} className={style.item}>
              {/* img */}
              <Link href={content.id} className={style.itemImage}>
                <Image
                  className={style.itemImageInside}
                  src={content.thumbnail.url}
                  alt={content.title}
                  width={content.thumbnail.width}
                  height={content.thumbnail.height}
                />
              </Link>
              {/* content */}
              <Link href={content.id} className={style.itemContent}>
                <div className={style.itemContentTitle}>
                  <span className={style.itemContentTitleCategory}>
                    {content.category?.english}
                  </span>
                  <h1 className={style.itemContentTitleInside}>{content.title}</h1>
                </div>
                <p className={`${textStyle.md} ${style.itemContentIntroduction}`}>
                  {content.introduction}
                </p>
              </Link>
            </li>
          ),
      )}
    </Swiper>
  )
}
