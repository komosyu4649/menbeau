'use client'

import React from 'react'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { MicroCMSContent } from '../microcms'
import style from './BaseSwiper.module.scss'
import { PostEntertainment } from '@/components/PostEntertainmentItem'
import 'swiper/css'
import { PostProgressItem } from '@/components/PostProgressItem'

type Props = {
  name: string
  spaceBetween: number
  slidesPerView: number
  slidesOffsetAfter: number
  slidesOffsetBefore: number
  contents: MicroCMSContent[]
}

export const BasicSwiper: React.FC<Props> = ({
  name,
  spaceBetween,
  slidesPerView,
  slidesOffsetAfter,
  slidesOffsetBefore,
  contents,
}) => {
  console.log(slidesOffsetAfter)
  const PostItem = (content: MicroCMSContent) => {
    switch (name) {
      case 'progress':
        return <PostProgressItem content={content} />
        break
      case 'entertainment':
        return <PostEntertainment content={content} />
        break
    }
  }

  return (
    <div className={style.container}>
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: `#${name}_swiper_prev`,
          nextEl: `#${name}_swiper_next`,
        }}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        slidesOffsetAfter={slidesOffsetAfter * window.innerWidth}
        slidesOffsetBefore={slidesOffsetBefore * window.innerWidth}
      >
        {contents.map((content) => (
          <SwiperSlide key={content.id}>{PostItem(content)}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
