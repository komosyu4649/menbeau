import { client } from '../apis'

export const getMicroCMSData = async (contentId: string) => {
  const res = await client.getList({
    endpoint: contentId,
    queries: {
      limit: 100,
    },
  })
  return res
}

export const getMicroCMSDataList = async (
  contentId: string,
  offsetNumber: number = 0,
  limitNumber: number = 100,
  category?: string,
) => {
  const queries: { [key: string]: any } = {
    offset: offsetNumber,
    limit: limitNumber,
  }
  if (category) {
    queries.filter = `category[equals]${category}`
  }
  const res = await client.getList({
    endpoint: contentId,
    queries,
  })
  return res
}

export const getCategoryContentCount = async (contentId: string, category?: string) => {
  const queries: { [key: string]: any } = {
    offset: 0,
    limit: 100,
  }
  const res = await client.getList({
    endpoint: contentId,
    queries,
  })
  const categoryRes = res.contents.filter((content) => content.category.english === category)
  return categoryRes.length
}
