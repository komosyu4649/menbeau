import Image from 'next/image'
import React from 'react'
import style from './page.module.scss'
import { Breadcrumb } from '@/components/Breadcrumb'
import { Keyword } from '@/components/Keyword'
import { formatDate } from '@/lib/dayjs'
import { MicroCMSCategoryData, MicroCMSContentsData } from '@/lib/microcms'
import { getMicroCMSData } from '@/lib/microcms/getData'
import layoutStyle from '@/styles/Layout.module.scss'
import textStyle from '@/styles/Text.module.scss'

export async function generateStaticParams() {
  const contentsData: MicroCMSContentsData = await getMicroCMSData('contents')
  return contentsData.contents.map((content) => ({
    category: content.category?.english,
    slug: content.id,
  }))
}

export default async function CategoryDetail({ params }: { params: { slug: string } }) {
  const { slug } = params
  const contentsData: MicroCMSContentsData = await getMicroCMSData('contents')
  const { contents } = contentsData
  //   console.log(contents)
  const detailContents = contents.filter((content) => slug === content.id)
  const detailContent = detailContents[0]
  // console.log(detailContent)

  const breadcrumb = [
    {
      url: '/',
      name: 'ホーム',
    },
    {
      url: detailContent.category.english,
      name: detailContent.category.japanese,
    },
    {
      url: detailContent.id,
      name: detailContent.title,
    },
  ]

  return (
    <article className={`${layoutStyle.md} ${style.container}`}>
      {/* header */}
      <div className={style.header}>
        {/* thumbnail */}
        <Image
          className={style.headerThumbnail}
          src={detailContent.thumbnail.url}
          alt={detailContent.title}
          width={detailContent.thumbnail.width}
          height={detailContent.thumbnail.height}
        />
        {/* content */}
        <div className={style.headerContent}>
          {/* title */}
          <div className={style.headerContentTitle}>
            <span className={style.headerContentTitleCategory}>
              {detailContent.category.english}
            </span>
            <h1 className={style.headerContentTitleInside}>{detailContent.title}</h1>
          </div>
          {/* information */}
          <div className={style.headerContentInformation}>
            {/* keywordss */}
            <div className={style.headerContentInformationKeywords}>
              <ul className={style.headerContentInformationList}>
                {detailContent.keywords.map((keyword) => (
                  <li key={keyword.id} className={style.headerContentInformationItem}>
                    <Keyword id={keyword.id} name={keyword.name} color='black' />
                  </li>
                ))}
              </ul>
            </div>
            {/* date */}
            <time className={style.headerContentInformationDate}>
              {formatDate(detailContent.publishedAt)}
            </time>
          </div>
          {/* introduction */}
          <p className={`${textStyle.md} ${style.headerContentIntroduction}`}>
            {detailContent.introduction}
          </p>
          {/* breadcrumb */}
          <div className={style.headerContentBreadcrumb}>
            <Breadcrumb breadcrumb={breadcrumb} />
          </div>
        </div>
      </div>
      {/* body */}
      <div className={style.body}>
        {detailContent.mainContents.map((content, index) => (
          <div
            key={index}
            className={style.bodyContents}
            dangerouslySetInnerHTML={{ __html: content.contents }}
          ></div>
        ))}
      </div>
    </article>
  )
}
