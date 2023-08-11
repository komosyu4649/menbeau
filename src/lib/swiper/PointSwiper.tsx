'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { EffectFade, Autoplay, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import { MicroCMSContentsData } from '../microcms'
import style from './PointSwiper.module.scss'
import textStyle from '@/styles/Text.module.scss'

type Props = Pick<MicroCMSContentsData, 'contents'>

export const PointSwiper: React.FC<Props> = ({ contents }) => {
  return (
    <Swiper
      className={`swiperPoint ${style.container}`}
      modules={[EffectFade, Autoplay, Pagination]}
      effect='fade'
      slidesPerView={1}
      autoHeight={true}
      loop
      speed={500}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
    >
      {contents.flatMap(
        (content) =>
          content.pickup && (
            <SwiperSlide>
              <div key={content.id} className={style.item}>
                {/* img */}
                <Link
                  href={`/${content.category.english}/${content.id}`}
                  className={style.itemImage}
                >
                  <Image
                    className={style.itemImageInside}
                    src={content.thumbnail.url}
                    alt={content.title}
                    width={content.thumbnail.width}
                    height={content.thumbnail.height}
                  />
                </Link>
                {/* content */}
                <Link
                  href={`/${content.category.english}/${content.id}`}
                  className={style.itemContent}
                >
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
              </div>
            </SwiperSlide>
          ),
      )}
    </Swiper>
  )
}
