import { client } from '../apis'

export const getMicroCMSData = async (contentId: string) => {
  const res = await client.getList({
    endpoint: contentId,
  })
  return res
}
