'use client'

import React, { useEffect, useState } from 'react'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { MicroCMSContent } from '../microcms'
import style from './BaseSwiper.module.scss'
import { PostEntertainmentItem } from '@/components/PostEntertainmentItem'
import 'swiper/css'
import { PostInterviewItem } from '@/components/PostInterviewItem'
import { PostProgressItem } from '@/components/PostProgressItem'
import { BREAK_POINT } from '@/constants'

type Props = {
  name: string
  spaceBetween: number
  spSpaceBetween?: number
  slidesPerView: number
  spSlidesPerView?: number
  slidesOffsetBefore: number
  spSlidesOffsetBefore?: number
  slidesOffsetAfter: number
  contents: MicroCMSContent[]
  startIndex?: number
  endIndex?: number
}

export const BasicSwiper: React.FC<Props> = ({
  name,
  spaceBetween,
  spSpaceBetween = 10,
  slidesPerView,
  spSlidesPerView,
  slidesOffsetBefore,
  spSlidesOffsetBefore,
  slidesOffsetAfter,
  contents,
  startIndex = 0,
  endIndex = 0,
}) => {
  const PostItem = (content: MicroCMSContent) => {
    switch (name) {
      case 'progress':
        return <PostProgressItem content={content} />
        break
      case 'entertainment':
        return <PostEntertainmentItem content={content} />
        break
      case 'interview':
        return <PostInterviewItem content={content} />
        break
    }
  }

  const [windowWidth, setWindowWidth] = useState(0)
  useEffect(() => {
    setWindowWidth(window.innerWidth)
  }, [windowWidth])

  console.log(slidesOffsetBefore, windowWidth)

  return (
    <div className={style.container}>
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: `#${name}_swiper_prev`,
          nextEl: `#${name}_swiper_next`,
        }}
        spaceBetween={windowWidth > BREAK_POINT && spSpaceBetween ? spSpaceBetween : spaceBetween}
        slidesPerView={
          windowWidth < BREAK_POINT && spSlidesPerView ? spSlidesPerView : slidesPerView
        }
        slidesOffsetBefore={
          windowWidth < BREAK_POINT && spSlidesOffsetBefore
            ? spSlidesOffsetBefore * windowWidth
            : slidesOffsetBefore * windowWidth
        }
        slidesOffsetAfter={slidesOffsetAfter * windowWidth}
      >
        {contents.map(
          (content, index) =>
            index >= startIndex &&
            index <= endIndex && <SwiperSlide key={content.id}>{PostItem(content)}</SwiperSlide>,
        )}
      </Swiper>
    </div>
  )
}
