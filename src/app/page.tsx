import fs from 'fs'
import type { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import style from './page.module.scss'
import { PostEntertainment } from '@/components/PostEntertainmentItem'
import { PostInterviewItem } from '@/components/PostInterviewItem'
import { PostKnowhowItem } from '@/components/PostKnowhowItem'
import { PostNewItem } from '@/components/PostNewItem'
import { PostProductsItem } from '@/components/PostProductsItem'
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
  const categoryFilteredContents = (category: string) =>
    contents.filter((content) => content.category?.english === category)

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
                index < 4 && (
                  <PostNewItem key={content.id} content={content} />
                  // <li key={content.id} className={style.newMainItem}>
                  //   <Link href={content.id} className={style.newMainItemLink}>
                  //     <Image
                  //       className={style.newMainItemImage}
                  //       src={content.thumbnail.url}
                  //       alt={content.title}
                  //       width={content.thumbnail.width}
                  //       height={content.thumbnail.height}
                  //     />
                  //     <div className={style.newMainItemContent}>
                  //       <time className={style.newMainItemContentDate}>
                  //         {formatDate(content.publishedAt)}
                  //       </time>
                  //       <p className={`${titleStyle.jaMd} ${style.newMainItemContentTitle}`}>
                  //         {content.title}
                  //       </p>
                  //     </div>
                  //   </Link>
                  // </li>
                ),
            )}
          </ul>
          <Link href='/' className={`${buttonStyle.default} ${style.newMainButton}`}>
            すべての記事一覧
          </Link>
        </div>
      </section>
      {/* interview */}
      <section className={`${layoutStyle.lg} ${style.interview}`}>
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
                  <PostInterviewItem key={content.id} content={content} />
                  // <li key={content.id} className={style.interviewMainItem}>
                  //   <Link href={content.id} className={style.interviewMainItemLink}>
                  //     <Image
                  //       className={style.interviewMainItemImage}
                  //       src={content.thumbnail.url}
                  //       alt={content.title}
                  //       width={content.thumbnail.width}
                  //       height={content.thumbnail.height}
                  //     />
                  //     <div className={style.interviewMainItemImageContent}>
                  //       <h2
                  //         className={`${titleStyle.jaMd} ${style.interviewMainItemImageContentTitle}`}
                  //       >
                  //         {content.title}
                  //       </h2>
                  //       <div className={style.interviewMainItemImageContentProfile}>
                  //         <Image
                  //           className={style.interviewMainItemImageContentProfileImage}
                  //           src={content.interviewee?.icon.url}
                  //           alt={content.interviewee?.name}
                  //           width={content.interviewee?.icon.width}
                  //           height={content.interviewee?.icon.height}
                  //         />
                  //         <span className={style.interviewMainItemImageContentProfileName}>
                  //           {content.interviewee?.name}
                  //         </span>
                  //       </div>
                  //     </div>
                  //   </Link>
                  // </li>
                ),
            )}
          </ul>
        </div>
      </section>
      {/* entertainment */}
      <section className={style.entertainment}>
        <h2 className={`${titleStyle.section} ${style.entertainmentTitle}`}>
          <span className={`${titleStyle.sectionEn} ${style.entertainmentTitleEn}`}>
            Entertainment
          </span>
          <span className={`${titleStyle.sectionJa} ${style.entertainmentTitleJa}`}>エンタメ</span>
        </h2>
        <div className={style.entertainmentMain}>
          <div className={style.entertainmentFunction}>
            <div className={style.entertainmentFunctionArrows}>
              <button className={style.entertainmentFunctionArrow}>
                <svg
                  width='72'
                  height='72'
                  viewBox='0 0 72 72'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <circle cx='36' cy='36' r='34.5' stroke='#231815' stroke-width='3' />
                  <path
                    d='M15.2929 35.2929C14.9024 35.6834 14.9024 36.3166 15.2929 36.7071L21.6569 43.0711C22.0474 43.4616 22.6805 43.4616 23.0711 43.0711C23.4616 42.6805 23.4616 42.0474 23.0711 41.6569L17.4142 36L23.0711 30.3431C23.4616 29.9526 23.4616 29.3195 23.0711 28.9289C22.6805 28.5384 22.0474 28.5384 21.6569 28.9289L15.2929 35.2929ZM56 35L16 35V37L56 37V35Z'
                    fill='#231815'
                  />
                </svg>
              </button>
              <button className={style.entertainmentFunctionArrow}>
                <svg
                  width='72'
                  height='72'
                  viewBox='0 0 72 72'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <circle
                    cx='36'
                    cy='36'
                    r='34.5'
                    transform='rotate(-180 36 36)'
                    stroke='#231815'
                    stroke-width='3'
                  />
                  <path
                    d='M56.7071 36.7071C57.0976 36.3166 57.0976 35.6834 56.7071 35.2929L50.3431 28.9289C49.9526 28.5384 49.3195 28.5384 48.9289 28.9289C48.5384 29.3195 48.5384 29.9526 48.9289 30.3431L54.5858 36L48.9289 41.6569C48.5384 42.0474 48.5384 42.6805 48.9289 43.0711C49.3195 43.4616 49.9526 43.4616 50.3431 43.0711L56.7071 36.7071ZM16 37L56 37L56 35L16 35L16 37Z'
                    fill='#231815'
                  />
                </svg>
              </button>
            </div>
            <Link href='' className={`${buttonStyle.default} ${style.entertainmentFunctionButton}`}>
              エンタメ一覧
            </Link>
          </div>
          <ul className={style.entertainmentMainList}>
            {categoryFilteredContents('Entertainment').map(
              (content, index) =>
                index < 4 && (
                  <PostEntertainment key={content.id} content={content} />
                  // <li key={content.id} className={style.entertainmentMainItem}>
                  //   <Link href={content.id} className={style.entertainmentMainItemLink}>
                  //     <Image
                  //       className={style.entertainmentMainItemImage}
                  //       src={content.thumbnail.url}
                  //       alt={content.title}
                  //       width={content.thumbnail.width}
                  //       height={content.thumbnail.height}
                  //     />
                  //     <div className={style.entertainmentMainItemContent}>
                  //       <h2
                  //         className={`${titleStyle.jaMd} ${style.entertainmentMainItemContentTitle}`}
                  //       >
                  //         {content.title}
                  //       </h2>
                  //     </div>
                  //   </Link>
                  // </li>
                ),
            )}
          </ul>
        </div>
      </section>
      {/* knowhow */}
      <section className={`${layoutStyle.default} ${style.knowhow}`}>
        <h2 className={`${titleStyle.section} ${style.knowhowTitle}`}>
          <span className={`${titleStyle.sectionEn} ${style.knowhowTitleEn}`}>Knowhow</span>
          <span className={`${titleStyle.sectionJa} ${style.knowhowTitleJa}`}>美容知識</span>
        </h2>
        <div className={style.knowhowMain}>
          <ul className={style.knowhowMainList}>
            {categoryFilteredContents('Knowhow').map(
              (content, index) =>
                index < 4 && (
                  <PostKnowhowItem key={content.id} content={content} />
                  // <li key={content.id} className={style.knowhowMainItem}>
                  //   <Link href={content.id} className={style.knowhowMainItemLink}>
                  //     <Image
                  //       className={style.knowhowMainItemImage}
                  //       src={content.thumbnail.url}
                  //       alt={content.title}
                  //       width={content.thumbnail.width}
                  //       height={content.thumbnail.height}
                  //     />
                  //     <div className={style.knowhowMainItemContent}>
                  //       <h2 className={`${titleStyle.jaMd} ${style.knowhowMainItemContentTitle}`}>
                  //         {content.title}
                  //       </h2>
                  //     </div>
                  //   </Link>
                  // </li>
                ),
            )}
          </ul>
          <Link href='/' className={`${buttonStyle.default} ${style.knowhowMainButton}`}>
            美容知識一覧
          </Link>
        </div>
      </section>
      {/* products */}
      <section className={`${layoutStyle.default} ${style.products}`}>
        <h2 className={`${titleStyle.section} ${style.productsTitle}`}>
          <span className={`${titleStyle.sectionEn} ${style.productsTitleEn}`}>Products</span>
          <span className={`${titleStyle.sectionJa} ${style.productsTitleJa}`}>おすすめ商品</span>
        </h2>
        <div className={style.productsMain}>
          <ul className={style.productsMainList}>
            {categoryFilteredContents('Products').map(
              (content, index) =>
                index < 4 && (
                  <PostProductsItem key={content.id} content={content} />
                  // <li key={content.id} className={style.productsMainItem}>
                  //   <Link href={content.id} className={style.productsMainItemLink}>
                  //     <Image
                  //       className={style.productsMainItemImage}
                  //       src={content.thumbnail.url}
                  //       alt={content.title}
                  //       width={content.thumbnail.width}
                  //       height={content.thumbnail.height}
                  //     />
                  //     <div className={style.productsMainItemContent}>
                  //       <h2 className={`${titleStyle.jaMd} ${style.productsMainItemContentTitle}`}>
                  //         {content.title}
                  //       </h2>
                  //     </div>
                  //   </Link>
                  // </li>
                ),
            )}
          </ul>
          <Link href='/' className={`${buttonStyle.default} ${style.productsMainButton}`}>
            おすすめ商品一覧
          </Link>
        </div>
      </section>
      {/* progress */}
      <section className={style.progress}>
        <h2 className={`${titleStyle.section} ${style.progressTitle}`}>
          <span className={`${titleStyle.sectionEn} ${style.progressTitleEn}`}>Progress</span>
          <span className={`${titleStyle.sectionJa} ${style.progressTitleJa}`}>顔進捗</span>
        </h2>
        <div className={style.progressMain}>
          <ul className={style.progressMainList}>
            {categoryFilteredContents('Progress').map(
              (content, index) =>
                index < 10 && (
                  <li key={content.id} className={style.progressMainItem}>
                    <Link href='' className={style.progressMainItemLink}>
                      <Image
                        className={style.progressMainItemImage}
                        src={content.thumbnail.url}
                        alt={content.title}
                        width={content.thumbnail.width}
                        height={content.thumbnail.height}
                      />
                      <time className={`${titleStyle.jaMd} ${style.progressMainItemDate}`}>
                        {formatDate(content.publishedAt)}
                      </time>
                    </Link>
                  </li>
                ),
            )}
          </ul>
          <div className={style.progressFunction}>
            <div className={style.progressFunctionArrows}>
              <button className={`${style.progressFunctionArrow} ${style.left}`}>
                <svg
                  width='72'
                  height='72'
                  viewBox='0 0 72 72'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <circle cx='36' cy='36' r='34.5' fill='white' stroke='#231815' stroke-width='3' />
                  <path
                    d='M15.2929 35.2929C14.9024 35.6834 14.9024 36.3166 15.2929 36.7071L21.6569 43.0711C22.0474 43.4616 22.6805 43.4616 23.0711 43.0711C23.4616 42.6805 23.4616 42.0474 23.0711 41.6569L17.4142 36L23.0711 30.3431C23.4616 29.9526 23.4616 29.3195 23.0711 28.9289C22.6805 28.5384 22.0474 28.5384 21.6569 28.9289L15.2929 35.2929ZM56 35L16 35L16 37L56 37L56 35Z'
                    fill='#231815'
                  />
                </svg>
              </button>
              <button className={`${style.progressFunctionArrow} ${style.right}`}>
                <svg
                  width='72'
                  height='72'
                  viewBox='0 0 72 72'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <circle
                    cx='36'
                    cy='36'
                    r='34.5'
                    transform='rotate(-180 36 36)'
                    fill='white'
                    stroke='#231815'
                    stroke-width='3'
                  />
                  <path
                    d='M56.7071 36.7071C57.0976 36.3166 57.0976 35.6834 56.7071 35.2929L50.3431 28.9289C49.9526 28.5384 49.3195 28.5384 48.9289 28.9289C48.5384 29.3195 48.5384 29.9526 48.9289 30.3431L54.5858 36L48.9289 41.6569C48.5384 42.0474 48.5384 42.6805 48.9289 43.0711C49.3195 43.4616 49.9526 43.4616 50.3431 43.0711L56.7071 36.7071ZM16 37L56 37L56 35L16 35L16 37Z'
                    fill='#231815'
                  />
                </svg>
              </button>
            </div>
            <Link href='' className={`${buttonStyle.default} ${style.progressFunctionButton}`}>
              顔進捗一覧
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
