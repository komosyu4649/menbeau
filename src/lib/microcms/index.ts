import type { BaseStructure, ContentStructure } from './utils'

export type MicroCMSCategoryData = ContentStructure<{
  japanese: string
  english: string
}>

export type MicroCMSKeywordsData = ContentStructure<{
  name: string
}>

type Thumbnail = {
  url: string
  height: number
  width: number
}

type ContentsCustomfield = {
  fieldId: string
  name: string
  icon: Thumbnail
  contents: string
  interviewer: false
}

type MicroCMSContentBase = {
  thumbnail: Thumbnail
  title: string
  introduction: string
  mainContents: ContentsCustomfield[]
  related: BaseStructure<{
    thumbnail: Thumbnail
    title: string
    introduction: string
    mainContents: ContentsCustomfield[]
    related: []
    pickup: boolean
    category: BaseStructure<{ japanese: string; english: string }>
    keywords: BaseStructure<
      {
        id: string
        createdAt: string
        updatedAt: string
        publishedAt: string
        revisedAt: string
        name: string
      }[]
    >
    interviewee: ContentsCustomfield
  }>[]
  pickup: boolean
  category: BaseStructure<{ japanese: string; english: string }>
  keywords: BaseStructure<
    {
      id: string
      createdAt: string
      updatedAt: string
      publishedAt: string
      revisedAt: string
      name: string
    }[]
  >
  interviewee: ContentsCustomfield
}

export type MicroCMSContent = BaseStructure<MicroCMSContentBase>

export type MicroCMSContentsData = ContentStructure<MicroCMSContentBase>
