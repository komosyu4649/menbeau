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

// 参考
// https://blog.microcms.io/nuxt-jamstack-paging/
// https://www.tyai-a.com/posts/microcms-filter-posts
export async function getMicroCMSDataList(
  contentId: string,
  offsetNumber: number = 0,
  limitNumber: number = 100,
  categoryId?: string,
) {
  // const queries: { [key: string]: any } = {
  //   offset: offsetNumber,
  //   limit: limitNumber,
  // }
  // if (category) {
  //   queries.filter = `category.english[equals]${category}`
  // }
  const res = await client.getList({
    endpoint: contentId,
    queries: {
      offset: offsetNumber,
      limit: limitNumber,
      filters: `category[equals]${categoryId}`,
    },
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
