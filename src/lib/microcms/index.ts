import type { ContentStructure } from './utils'

export type MicroCMSCategoryData = ContentStructure<{
  japanese: string
  english: string
}>

export type MicroCMSKeywordsData = ContentStructure<{
  name: string
}>

export type MicroCMSContentsData = ContentStructure<{
  thumbnail: {
    url: string
    height: number
    width: number
  }
  title: string
  introduction: string
  mainContents: {
    fieldId: string
    contents: string
  }[]
  related: ContentStructure<
    {
      thumbnail: {
        url: string
        height: number
        width: number
      }
      title: string
      introduction: string
      mainContents: {
        fieldId: string
        contents: string
      }
      related: []
    }[]
  >
}>
