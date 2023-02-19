import fs from 'fs'
import type { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import style from './page.module.scss'
import { MicroCMSContentsData } from '@/lib/microcms'
import { client } from '@/lib/microcms/apis'
import { formatDate } from '@/lib/microcms/dayjs'
import { getMicroCMSData } from '@/lib/microcms/getData'
import buttonStyle from '@/styles/Button.module.scss'
import layoutStyle from '@/styles/Layout.module.scss'
import textStyle from '@/styles/Text.module.scss'
import titleStyle from '@/styles/Title.module.scss'

export default async function Home() {
  const categoriesData = await getMicroCMSData('categories')
  fs.writeFileSync('public/json/microCMSCategoryData.json', JSON.stringify(categoriesData))
  const keywordsData = await getMicroCMSData('keywords')
  fs.writeFileSync('public/json/microCMSKeywordData.json', JSON.stringify(keywordsData))
  const contentsData: MicroCMSContentsData = await getMicroCMSData('contents')
  const { contents } = contentsData
  // console.log(contents)
  const categoryFilteredContents = (category: string) =>
    contents.filter((content) => content.category?.english === category)

  // console.log(categoryFilteredContents('Interview'))

  return (
    <main className={style.main}>
      {/* kv */}
      <section className={`${layoutStyle.default} ${style.kv}`}>
        <ul className={style.kvList}>
          {contentsData.contents.flatMap(
            (content) =>
              content.pickup && (
                <li key={content.id} className={style.kvItem}>
                  <Link href={content.id} className={style.kvItemLink}>
                    {/* img */}
                    <Image
                      className={style.kvItemImage}
                      src={content.thumbnail.url}
                      alt={content.title}
                      width={content.thumbnail.width}
                      height={content.thumbnail.height}
                      // fill
                    />
                    {/* content */}
                    <div className={style.kvItemContent}>
                      <div className={style.kvItemContentTitle}>
                        <span className={style.kvItemContentTitleCategory}>
                          {content.category?.english}
                        </span>
                        <h1 className={style.kvItemContentTitleInside}>{content.title}</h1>
                      </div>
                      <p className={`${textStyle.md} ${style.kvItemContentIntroduction}`}>
                        {content.introduction}
                      </p>
                    </div>
                  </Link>
                </li>
              ),
          )}
        </ul>
      </section>

      {/* new contents */}
      <section className={`${layoutStyle.default} ${style.new}`}>
        <h2 className={`${titleStyle.section} ${style.newTitle}`}>
          <span className={`${titleStyle.sectionEn} ${style.newTitleEn}`}>New contents</span>
          <span className={`${titleStyle.sectionJa} ${style.newTitleJa}`}>新着記事</span>
        </h2>
        <div className={style.newMain}>
          <ul className={style.newMainList}>
            {contentsData.contents.flatMap(
              (content, index) =>
                !content.pickup &&
                index <= 4 && (
                  <li key={content.id} className={style.newMainItem}>
                    <Link href={content.id} className={style.newsMainItemLink}>
                      <Image
                        className={style.newMainItemImage}
                        src={content.thumbnail.url}
                        alt={content.title}
                        width={content.thumbnail.width}
                        height={content.thumbnail.height}
                      />
                      <div className={style.newMainItemContent}>
                        <time className={style.newMainItemContentDate}>
                          {formatDate(content.publishedAt)}
                        </time>
                        <p className={`${titleStyle.jaMd} ${style.newMainItemContentTitle}`}>
                          {content.title}
                        </p>
                      </div>
                    </Link>
                  </li>
                ),
            )}
          </ul>
          <Link href='/' className={`${buttonStyle.default} ${style.newMainButton}`}>
            すべての記事一覧
          </Link>
        </div>
      </section>

      {/* interview */}
      <section className={`${layoutStyle.default} ${style.interview}`}>
        <h2 className={`${titleStyle.section} ${style.interviewTitle}`}>
          <span className={`${titleStyle.sectionEn} ${style.interviewTitleEn}`}>Interview</span>
          <span className={`${titleStyle.sectionJa} ${style.interviewTitleJa}`}>インタビュー</span>
        </h2>
        <div className={style.interviewMain}>
          <div className={style.interviewMainFeature}>
            {categoryFilteredContents('Interview').map(
              (content, index) =>
                index === 0 && (
                  <Link
                    href={content.id}
                    key={content.id}
                    className={style.interviewMainFeatureLink}
                  >
                    <Image
                      className={style.interviewMainFeatureImage}
                      src={content.thumbnail.url}
                      alt={content.title}
                      width={content.thumbnail.width}
                      height={content.thumbnail.height}
                    />
                    <div className={style.interviewMainFeatureContent}>
                      <h2 className={style.interviewMainFeatureContentTitle}>{content.title}</h2>
                      <div className={style.interviewMainFeatureContentProfile}>
                        <Image
                          className={style.interviewMainFeatureContentProfileImage}
                          src={content.interviewee.icon.url}
                          alt={content.interviewee.name}
                          width={content.interviewee.icon.width}
                          height={content.interviewee.icon.height}
                        />
                        <span className={style.interviewMainFeatureContentProfileName}>
                          {content.interviewee.name}
                        </span>
                      </div>
                    </div>
                  </Link>
                ),
            )}
            <Link href='' className={`${buttonStyle.default} ${style.interviewMainFeatureButton}`}>
              インタビュー一覧
            </Link>
          </div>
          <ul className={style.interviewMainList}>
            {categoryFilteredContents('Interview').map(
              (content, index) =>
                index >= 1 &&
                index <= 4 && (
                  <li key={content.id} className={style.interviewMainItem}>
                    <Link href={content.id} className={style.interviewMainItemLink}>
                      <Image
                        className={style.interviewMainItemImage}
                        src={content.thumbnail.url}
                        alt={content.title}
                        width={content.thumbnail.width}
                        height={content.thumbnail.height}
                      />
                      <div className={style.interviewMainItemImageContent}>
                        <h2
                          className={`${titleStyle.jaMd} ${style.interviewMainItemImageContentTitle}`}
                        >
                          {content.title}
                        </h2>
                        <div className={style.interviewMainItemImageContentProfile}>
                          <Image
                            className={style.interviewMainItemImageContentProfileImage}
                            src={content.interviewee?.icon.url}
                            alt={content.interviewee?.name}
                            width={content.interviewee?.icon.width}
                            height={content.interviewee?.icon.height}
                          />
                          <span className={style.interviewMainItemImageContentProfileName}>
                            {content.interviewee?.name}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                ),
            )}
          </ul>
        </div>
      </section>
    </main>
  )
}
