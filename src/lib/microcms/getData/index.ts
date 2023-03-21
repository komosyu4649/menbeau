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
  const res = await client.getList({
    endpoint: contentId,
    queries: {
      offset: offsetNumber,
      limit: limitNumber,
      filters: categoryId ? `category[equals]${categoryId}` : '',
    },
  })
  return res
}
