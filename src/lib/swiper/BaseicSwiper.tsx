'use client'

import React from 'react'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { MicroCMSContent } from '../microcms'
import style from './BaseSwiper.module.scss'
import { PostEntertainment } from '@/components/PostEntertainmentItem'
import 'swiper/css'

type Props = {
  name: string
  spaceBetween: number
  slidesPerView: number
  contents: MicroCMSContent[]
}

export const BasicSwiper: React.FC<Props> = ({ name, spaceBetween, slidesPerView, contents }) => {
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
      >
        {contents.map((content) => (
          <SwiperSlide key={content.id}>
            {/* childrenを親から渡すようにしましょう */}
            <PostEntertainment content={content} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
