import { NextApiRequest, NextApiResponse } from 'next'
import React from 'react'
import { MICROCMS_CONTENTS_TYPE_CONTENTS } from '@/constants'
import { client } from '@/lib/microcms/apis'

const getSearchPosts = async (req: NextApiRequest, res: NextApiResponse) => {
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
