import { NextApiRequest, NextApiResponse } from 'next'
import React from 'react'

const getSearchPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  const { q } = req.query as { q: string }
  const apiKey = {
    headers: { 'X-MICROCMS-API-KEY': process.env.NEXT_PUBLIC_MICROCMS_API_KEY ?? '' },
  }
  const searchPosts = await fetch(
    `https://menbeau.microcms.io/api/v1/contents?q=${encodeURI(req.body.q)}`,
    apiKey,
  )
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch(() => null)
  return res.status(200).json(searchPosts)
}
export default getSearchPosts
