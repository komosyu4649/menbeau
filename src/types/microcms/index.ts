import type { Structure } from './utils'

export type MicroCMSCategoryData<T> = Structure<
  T,
  {
    japanese: string
    english: string
  }
>

export type MicroCMSKeywordsData<T> = Structure<
  T,
  {
    name: string
  }
>

export type MicroCMSContentsData<T> = Structure<
  T,
  {
    thumbnail: []
    title: string
    introduction: string
    mainContents: []
    related: []
  }
>
