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
            {contentsData.contents.flatMap(
              (content, index) =>
                !content.pickup &&
                index < 4 && (
                  <li key={content.id} className={style.newMainItem}>
                    <PostNewItem content={content} />,
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
      <section className={`${layoutStyle.lg} ${style.interview}`}>
        <h2 className={`${titleStyle.section} ${style.interviewTitle}`}>
          <span className={`${titleStyle.sectionEn} ${style.interviewTitleEn}`}>Interview</span>
          <span className={`${titleStyle.sectionJa} ${style.interviewTitleJa}`}>インタビュー</span>
        </h2>
        <div className={style.interviewMain}>
          <div className={style.interviewMainFeature}>
            {categoryFilteredContents('interview').map(
              (content, index) =>
                index === 0 && (
                  <Link
                    href={`/interview/${content.id}`}
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
            {categoryFilteredContents('interview').map(
              (content, index) =>
                index >= 1 &&
                index <= 4 && (
                  <li key={content.id} className={style.interviewMainItem}>
                    <PostInterviewItem content={content} />
                  </li>
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
            <Link href='' className={`${buttonStyle.default} ${style.entertainmentFunctionButton}`}>
              エンタメ一覧
            </Link>
          </div>
          <BasicSwiper
            name='entertainment'
            spaceBetween={15}
            slidesPerView={2.234}
            slidesOffsetBefore={0}
            slidesOffsetAfter={0.04}
            contents={categoryFilteredContents('entertainment')}
          />
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
            {categoryFilteredContents('knowhow').map(
              (content, index) =>
                index < 4 && (
                  <li key={content.id} className={style.knowhowMainItem}>
                    <PostKnowhowItem content={content} />,
                  </li>
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
            {categoryFilteredContents('products').map(
              (content, index) =>
                index < 4 && (
                  <li key={content.id} className={style.productsMainItem}>
                    <PostProductsItem content={content} />,
                  </li>
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
          <BasicSwiper
            name='progress'
            spaceBetween={10}
            slidesPerView={5.58}
            slidesOffsetBefore={0.04}
            slidesOffsetAfter={0.04}
            contents={categoryFilteredContents('progress')}
          />
          <div className={style.progressFunction}>
            <div className={style.progressFunctionArrows}>
              <button
                id='progress_swiper_prev'
                className={`${swiperStyle.navigation} ${style.progressFunctionArrow} ${style.left} `}
              >
                <svg
                  width='72'
                  height='72'
                  viewBox='0 0 72 72'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <circle cx='36' cy='36' r='34.5' fill='white' stroke='#231815' strokeWidth='3' />
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
                    strokeWidth='3'
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
