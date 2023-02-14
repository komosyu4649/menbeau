import fs from 'fs'
import type { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import style from './page.module.scss'
import { MicroCMSContentsData } from '@/lib/microcms'
import { client } from '@/lib/microcms/apis'
import { getMicroCMSData } from '@/lib/microcms/getData'
import layoutStyle from '@/styles/Layout.module.scss'
import textStyle from '@/styles/Text.module.scss'

export default async function Home() {
  const categoriesData = await getMicroCMSData('categories')
  fs.writeFileSync('public/json/microCMSCategoryData.json', JSON.stringify(categoriesData))
  const keywordsData = await getMicroCMSData('keywords')
  fs.writeFileSync('public/json/microCMSKeywordData.json', JSON.stringify(keywordsData))
  const contentsData: MicroCMSContentsData = await getMicroCMSData('contents')

  console.log(contentsData.contents[0].thumbnail)
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
    </main>
  )
}
