import style from './page.module.scss'
import { CategoryKv } from '@/components/CategoryKv'
import { CategoryMain } from '@/components/CategoryMain'
import { Pagination } from '@/components/Pagination'
import { Sidebar } from '@/components/Sidebar'
import {
  MICROCMS_CONTENTS_TYPE_CATEGORIES,
  MICROCMS_CONTENTS_TYPE_CONTENTS,
  PER_PAGE,
} from '@/constants'
import { MicroCMSCategoryData, MicroCMSContentsData } from '@/lib/microcms'
import { getMicroCMSData, getMicroCMSDataList } from '@/lib/microcms/getData'
import layoutStyle from '@/styles/Layout.module.scss'

export async function generateStaticParams() {
  const categoriesData: MicroCMSCategoryData = await getMicroCMSData(
    MICROCMS_CONTENTS_TYPE_CATEGORIES,
  )
  return categoriesData.contents.map((content) => ({
    category: content.english,
  }))
}

export async function generateMetadata({ params }: { params: { category: string } }) {
  const { category } = params
  const categoriesData: MicroCMSCategoryData = await getMicroCMSData(
    MICROCMS_CONTENTS_TYPE_CATEGORIES,
  )
  const categoryData = categoriesData.contents.filter((content) => content.english === category)
  const categoryName = categoryData[0]?.japanese
  return {
    title: `${categoryName ? `${categoryName}に関する記事一覧` : 'すべての記事一覧'}`,
    description: `${categoryName ? `${categoryName}に関する記事一覧です` : 'すべての記事一覧です'}`,
  }
}

export default async function Category({ params }: { params: { category: string } }) {
  const { category } = params
  const categoryName: string = category || 'all'
  const categoriesData: MicroCMSCategoryData = await getMicroCMSData(
    MICROCMS_CONTENTS_TYPE_CATEGORIES,
  )
  const categoryData = categoriesData.contents.filter((content) => content.english === category)
  const categoryId = categoryData[0]?.id
  const contentsData: MicroCMSContentsData = await getMicroCMSDataList(
    MICROCMS_CONTENTS_TYPE_CONTENTS,
    0,
    PER_PAGE,
    categoryId,
  )
  const { contents, totalCount } = contentsData

  return (
    <div className={`${style.container} ${layoutStyle.lg}`}>
      <CategoryKv category={category} />
      <div className={style.main}>
        <Sidebar />
        <div className={style.mainContents}>
          <CategoryMain contents={contents} categoryName={categoryName} />
          <div className={style.mainContentsPagination}>
            <Pagination totalCount={totalCount} pageName={categoryName} currentNumber={1} />
          </div>
        </div>
      </div>
    </div>
  )
}
