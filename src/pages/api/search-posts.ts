import { NextApiRequest, NextApiResponse } from 'next'
import React from 'react'
import { MICROCMS_CONTENTS_TYPE_CONTENTS } from '@/constants'
import { client } from '@/lib/microcms/apis'

const getSearchPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(2, req, res)
  // const { q } = req.query as { q: string }
  // const apiKey = {
  //   headers: { 'X-MICROCMS-API-KEY': process.env.NEXT_PUBLIC_MICROCMS_API_KEY ?? '' },
  // }
  // const searchPosts = await fetch(`https://menbeau.microcms.io/api/v1/contents?q=テスト`, apiKey)
  //   .then((res) => res.json())
  //   .then((res) => console.log(res))
  //   .catch(() => null)
  // return res.status(200).json(searchPosts)
  const searchText: any = req.query.searchText
  const response = await client.getList({
    endpoint: MICROCMS_CONTENTS_TYPE_CONTENTS,
    queries: {
      limit: 100,
      q: decodeURI(searchText),
    },
  })
  return res.status(200).json(response)
}
export default getSearchPosts
