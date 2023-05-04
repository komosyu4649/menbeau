import fs from 'fs'
import Image from 'next/image'
import Link from 'next/link'
import style from './page.module.scss'
import { PostInterviewItem } from '@/components/PostInterviewItem'
import { PostKnowhowItem } from '@/components/PostKnowhowItem'
import { PostNewItem } from '@/components/PostNewItem'
import { PostProductsItem } from '@/components/PostProductsItem'
import {
  MICROCMS_CONTENTS_TYPE_CATEGORIES,
  MICROCMS_CONTENTS_TYPE_CONTENTS,
  MICROCMS_CONTENTS_TYPE_KEYWORDS,
} from '@/constants'
import { MicroCMSContentsData } from '@/lib/microcms'
import { getMicroCMSData } from '@/lib/microcms/getData'
import { BasicSwiper } from '@/lib/swiper/BaseSwiper'
import { PointSwiper } from '@/lib/swiper/PointSwiper'
import buttonStyle from '@/styles/Button.module.scss'
import layoutStyle from '@/styles/Layout.module.scss'
import swiperStyle from '@/styles/Swiper.module.scss'
import titleStyle from '@/styles/Title.module.scss'

export default async function Home() {
  const categoriesData = await getMicroCMSData(MICROCMS_CONTENTS_TYPE_CATEGORIES)
  fs.writeFileSync('public/json/microCMSCategoryData.json', JSON.stringify(categoriesData))
  const keywordsData = await getMicroCMSData(MICROCMS_CONTENTS_TYPE_KEYWORDS)
  fs.writeFileSync('public/json/microCMSKeywordData.json', JSON.stringify(keywordsData))
  const contentsData: MicroCMSContentsData = await getMicroCMSData(MICROCMS_CONTENTS_TYPE_CONTENTS)
  const { contents } = contentsData
  const categoryFilteredContents = (category: string) =>
    contents.filter((content) => content.category?.english === category)
  const newContents = contentsData.contents.filter(
    (content, index) => !content.pickup && index <= 4,
  )
  // interviewカテゴリーの記事を取得(newContetsに入っているものは除いて)
  const interviewContents = contentsData.contents.filter(
    (content) =>
      content.category?.english === 'interview' &&
      !newContents.includes(content) &&
      !content.pickup,
  )
  // enterrtainmentカテゴリーの記事を取得(newContetsに入っているものは除く)
  const entertainmentContents = contentsData.contents.filter(
    (content) =>
      content.category?.english === 'entertainment' &&
      !newContents.includes(content) &&
      !content.pickup,
  )
  // knowhowカテゴリーの記事を取得(newContetsに入っているものは除いて)
  const knowhowContents = contentsData.contents.filter(
    (content) =>
      content.category?.english === 'knowhow' && !newContents.includes(content) && !content.pickup,
  )
  // productsカテゴリーの記事を取得(newContetsに入っているものは除いて)
  const productsContents = contentsData.contents.filter(
    (content) =>
      content.category?.english === 'products' && !newContents.includes(content) && !content.pickup,
  )
  // progressカテゴリーの記事を取得(newContetsに入っているものは除いて)
  const progressContents = contentsData.contents.filter(
    (content) =>
      content.category?.english === 'progress' && !newContents.includes(content) && !content.pickup,
  )

  return (
    <main className={style.main}>
      {/* kv */}
      <section className={`${layoutStyle.default} ${style.kv}`}>
        <PointSwiper contents={contentsData.contents} />
      </section>

      {/* new contents */}
      <section className={`${layoutStyle.default} ${style.new}`}>
        <h2 className={`${titleStyle.section} ${style.newTitle}`}>
          <span className={`${titleStyle.sectionEn} ${style.newTitleEn}`}>New contents</span>
          <span className={`${titleStyle.sectionJa} ${style.newTitleJa}`}>新着記事</span>
        </h2>
        <div className={style.newMain}>
          <ul className={style.newMainList}>
            {newContents.map((content) => (
              <li key={content.id} className={style.newMainItem}>
                <PostNewItem content={content} />
              </li>
            ))}
          </ul>
          <Link href='/all/' className={`${buttonStyle.default} ${style.newMainButton}`}>
            すべての記事一覧
          </Link>
        </div>
      </section>

      {/* interview */}
      {interviewContents.length >= 1 && (
        <section className={`${layoutStyle.lg} ${style.interview}`}>
          <h2 className={`${titleStyle.section} ${style.interviewTitle}`}>
            <span className={`${titleStyle.sectionEn} ${style.interviewTitleEn}`}>Interview</span>
            <span className={`${titleStyle.sectionJa} ${style.interviewTitleJa}`}>
              インタビュー
            </span>
          </h2>
          <div className={style.interviewMain}>
            <div className={style.interviewMainFeature}>
              <Link
                href={`/interview/${interviewContents[0].id}`}
                key={interviewContents[0].id}
                className={style.interviewMainFeatureLink}
              >
                <Image
                  className={style.interviewMainFeatureImage}
                  src={interviewContents[0].thumbnail.url}
                  alt={interviewContents[0].title}
                  width={interviewContents[0].thumbnail.width}
                  height={interviewContents[0].thumbnail.height}
                />
                <div className={style.interviewMainFeatureContent}>
                  <h2 className={style.interviewMainFeatureContentTitle}>
                    {interviewContents[0].title}
                  </h2>
                  <div className={style.interviewMainFeatureContentProfile}>
                    <Image
                      className={style.interviewMainFeatureContentProfileImage}
                      src={interviewContents[0].interviewee.icon.url}
                      alt={interviewContents[0].interviewee.name}
                      width={interviewContents[0].interviewee.icon.width}
                      height={interviewContents[0].interviewee.icon.height}
                    />
                    <span className={style.interviewMainFeatureContentProfileName}>
                      {interviewContents[0].interviewee.name}
                    </span>
                  </div>
                </div>
              </Link>
              <Link
                href='/interivew/'
                className={`${buttonStyle.default} ${style.interviewMainFeatureButton}`}
              >
                インタビュー一覧
              </Link>
            </div>
            <div className={style.interviewMainContainer}>
              <ul className={style.interviewMainList}>
                {interviewContents.map(
                  (content, index) =>
                    index >= 1 && (
                      <li key={content.id} className={style.interviewMainItem}>
                        <PostInterviewItem content={content} />
                      </li>
                    ),
                )}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* entertainment */}
      {entertainmentContents.length >= 1 && (
        <section className={style.entertainment}>
          <h2 className={`${titleStyle.section} ${style.entertainmentTitle}`}>
            <span className={`${titleStyle.sectionEn} ${style.entertainmentTitleEn}`}>
              Entertainment
            </span>
            <span className={`${titleStyle.sectionJa} ${style.entertainmentTitleJa}`}>
              エンタメ
            </span>
          </h2>
          <div className={style.entertainmentMain}>
            <div className={style.entertainmentFunction}>
              <div className={style.entertainmentFunctionArrows}>
                <button
                  id='entertainment_swiper_prev'
                  className={`${swiperStyle.navigation} ${style.entertainmentFunctionArrow}`}
                >
                  <svg
                    width='72'
                    height='72'
                    viewBox='0 0 72 72'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className={style.entertainmentFunctionArrowIcon}
                  >
                    <circle cx='36' cy='36' r='34.5' stroke='#231815' strokeWidth='3' />
                    <path
                      d='M15.2929 35.2929C14.9024 35.6834 14.9024 36.3166 15.2929 36.7071L21.6569 43.0711C22.0474 43.4616 22.6805 43.4616 23.0711 43.0711C23.4616 42.6805 23.4616 42.0474 23.0711 41.6569L17.4142 36L23.0711 30.3431C23.4616 29.9526 23.4616 29.3195 23.0711 28.9289C22.6805 28.5384 22.0474 28.5384 21.6569 28.9289L15.2929 35.2929ZM56 35L16 35V37L56 37V35Z'
                      fill='#231815'
                    />
                  </svg>
                </button>
                <button
                  id='entertainment_swiper_next'
                  className={`${swiperStyle.navigation} ${style.entertainmentFunctionArrow}`}
                >
                  <svg
                    width='72'
                    height='72'
                    viewBox='0 0 72 72'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className={style.entertainmentFunctionArrowIcon}
                  >
                    <circle
                      cx='36'
                      cy='36'
                      r='34.5'
                      transform='rotate(-180 36 36)'
                      stroke='#231815'
                      strokeWidth='3'
                    />
                    <path
                      d='M56.7071 36.7071C57.0976 36.3166 57.0976 35.6834 56.7071 35.2929L50.3431 28.9289C49.9526 28.5384 49.3195 28.5384 48.9289 28.9289C48.5384 29.3195 48.5384 29.9526 48.9289 30.3431L54.5858 36L48.9289 41.6569C48.5384 42.0474 48.5384 42.6805 48.9289 43.0711C49.3195 43.4616 49.9526 43.4616 50.3431 43.0711L56.7071 36.7071ZM16 37L56 37L56 35L16 35L16 37Z'
                      fill='#231815'
                    />
                  </svg>
                </button>
              </div>
              <Link
                href='/entertainment/'
                className={`${buttonStyle.default} ${style.entertainmentFunctionButton}`}
              >
                エンタメ一覧
              </Link>
            </div>
            <BasicSwiper
              name='entertainment'
              spaceBetween={15}
              spSpaceBetween={10}
              slidesPerView={2.234}
              spSlidesPerView={1.1635}
              slidesOffsetBefore={0}
              spSlidesOffsetBefore={0.04}
              slidesOffsetAfter={0.04}
              contents={entertainmentContents}
              startIndex={0}
              endIndex={3}
            />
          </div>
        </section>
      )}

      {/* knowhow */}
      {knowhowContents.length >= 1 && (
        <section className={`${layoutStyle.default} ${style.knowhow}`}>
          <h2 className={`${titleStyle.section} ${style.knowhowTitle}`}>
            <span className={`${titleStyle.sectionEn} ${style.knowhowTitleEn}`}>Knowhow</span>
            <span className={`${titleStyle.sectionJa} ${style.knowhowTitleJa}`}>美容知識</span>
          </h2>
          <div className={style.knowhowMain}>
            <ul className={style.knowhowMainList}>
              {knowhowContents
                .filter((content) => !content.pickup)
                .map((content) => (
                  <li key={content.id} className={style.knowhowMainItem}>
                    <PostKnowhowItem content={content} />
                  </li>
                ))}
            </ul>
            <Link href='/knowhow/' className={`${buttonStyle.default} ${style.knowhowMainButton}`}>
              美容知識一覧
            </Link>
          </div>
        </section>
      )}

      {/* products */}
      {productsContents.length >= 1 && (
        <section className={`${layoutStyle.default} ${style.products}`}>
          <h2 className={`${titleStyle.section} ${style.productsTitle}`}>
            <span className={`${titleStyle.sectionEn} ${style.productsTitleEn}`}>Products</span>
            <span className={`${titleStyle.sectionJa} ${style.productsTitleJa}`}>おすすめ商品</span>
          </h2>
          <div className={style.productsMain}>
            <ul className={style.productsMainList}>
              {productsContents.map((content) => (
                <li key={content.id} className={style.productsMainItem}>
                  <PostProductsItem content={content} />
                </li>
              ))}
            </ul>
            <Link
              href='/products/'
              className={`${buttonStyle.default} ${style.productsMainButton}`}
            >
              おすすめ商品一覧
            </Link>
          </div>
        </section>
      )}

      {/* progress */}
      {progressContents.length >= 1 && (
        <section className={style.progress}>
          <h2 className={`${titleStyle.section} ${style.progressTitle}`}>
            <span className={`${titleStyle.sectionEn} ${style.progressTitleEn}`}>Progress</span>
            <span className={`${titleStyle.sectionJa} ${style.progressTitleJa}`}>顔進捗</span>
          </h2>
          <div className={style.progressMain}>
            <BasicSwiper
              name='progress'
              spaceBetween={10}
              slidesPerView={5.5}
              spSlidesPerView={2.25}
              slidesOffsetBefore={0.04}
              slidesOffsetAfter={0.04}
              contents={progressContents}
              startIndex={0}
              endIndex={7}
            />
            <div className={style.progressFunction}>
              <div className={style.progressFunctionArrows}>
                <button
                  id='progress_swiper_prev'
                  className={`${swiperStyle.navigation} ${style.progressFunctionArrow} ${style.left} `}
                >
                  <svg viewBox='0 0 72 72' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <circle
                      cx='36'
                      cy='36'
                      r='34.5'
                      fill='white'
                      stroke='#231815'
                      strokeWidth='3'
                    />
                    <path
                      d='M15.2929 35.2929C14.9024 35.6834 14.9024 36.3166 15.2929 36.7071L21.6569 43.0711C22.0474 43.4616 22.6805 43.4616 23.0711 43.0711C23.4616 42.6805 23.4616 42.0474 23.0711 41.6569L17.4142 36L23.0711 30.3431C23.4616 29.9526 23.4616 29.3195 23.0711 28.9289C22.6805 28.5384 22.0474 28.5384 21.6569 28.9289L15.2929 35.2929ZM56 35L16 35L16 37L56 37L56 35Z'
                      fill='#231815'
                    />
                  </svg>
                </button>
                <button
                  id='progress_swiper_next'
                  className={`${swiperStyle.navigation} ${style.progressFunctionArrow} ${style.right}`}
                >
                  <svg viewBox='0 0 72 72' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <circle
                      cx='36'
                      cy='36'
                      r='34.5'
                      transform='rotate(-180 36 36)'
                      fill='white'
                      stroke='#231815'
                      strokeWidth='3'
                    />
                    <path
                      d='M56.7071 36.7071C57.0976 36.3166 57.0976 35.6834 56.7071 35.2929L50.3431 28.9289C49.9526 28.5384 49.3195 28.5384 48.9289 28.9289C48.5384 29.3195 48.5384 29.9526 48.9289 30.3431L54.5858 36L48.9289 41.6569C48.5384 42.0474 48.5384 42.6805 48.9289 43.0711C49.3195 43.4616 49.9526 43.4616 50.3431 43.0711L56.7071 36.7071ZM16 37L56 37L56 35L16 35L16 37Z'
                      fill='#231815'
                    />
                  </svg>
                </button>
              </div>
              <Link
                href='/progress/'
                className={`${buttonStyle.default} ${style.progressFunctionButton}`}
              >
                顔進捗一覧
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
