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
