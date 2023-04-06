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
  const contentsData = await getMicroCMSDataList(MICROCMS_CONTENTS_TYPE_CONTENTS)
  const { totalCount } = contentsData
  const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i)
  const categoriesData: MicroCMSCategoryData = await getMicroCMSData(
    MICROCMS_CONTENTS_TYPE_CATEGORIES,
  )
  const categoryParams = categoriesData.contents.flatMap((content) =>
    range(1, Math.ceil(totalCount / PER_PAGE)).map((number) => ({
      category: content.english,
      number: number.toString(),
    })),
  )
  return categoryParams
}

type Props = {
  category: string
  number: string
}

export default async function Category({ params }: { params: Props }) {
  const { category, number } = params
  const currentNumber = Number(number)
  const categoryName: string = category || 'all'
  const categoriesData: MicroCMSCategoryData = await getMicroCMSData(
    MICROCMS_CONTENTS_TYPE_CATEGORIES,
  )
  const categoryData = categoriesData.contents.filter((content) => content.english === category)
  const categoryId = categoryData[0]?.id
  const contentsData: MicroCMSContentsData = await getMicroCMSDataList(
    MICROCMS_CONTENTS_TYPE_CONTENTS,
    (currentNumber - 1) * PER_PAGE,
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
            <Pagination
              totalCount={totalCount}
              pageName={categoryName}
              currentNumber={currentNumber}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
