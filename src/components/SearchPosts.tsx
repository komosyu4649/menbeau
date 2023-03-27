'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import useSWR from 'swr'

const fetcher = (url: string, searchText: string) => {
  return fetch(`${url}?q=${searchText}`).then((res) => res.json())
}
// console.log(fetcher)

export const SearchPosts = () => {
  //   fetch('https://menbeau.microcms.io/api/v1/contents?q=顔顔進捗こんな感じです6', {
  //     headers: {
  //       'X-MICROCMS-API-KEY': process.env.NEXT_PUBLIC_MICROCMS_API_KEY,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((res) => console.log(res))
  //   const searchParams = useSearchParams()
  //   const { data, error } = useSWR(['api/search-posts', searchParams.get('q')], fetcher)
  //   console.log(data)
  return <div>SearchPosts</div>
}
