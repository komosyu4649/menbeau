import { client } from '../apis'

export const getMicroCMSData = async (contentId: any) => {
  const res = await client.getList({ endpoint: contentId })
  return res
}
