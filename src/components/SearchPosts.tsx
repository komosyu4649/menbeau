'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import useSWR from 'swr'
import { searchKeyword } from '@/store/seachKeyword'

const fetcher = (url: string, searchText: string) => {
  return fetch(`${url}?q=${searchText}`).then((res) => res.json())
}

// console.log(fetcher)

export const SearchPosts = () => {
  const [searchText, setSearchText] = useRecoilState(searchKeyword)
  // console.log(1, searchText)
  // fetch('https://menbeau.microcms.io/api/v1/contents?q=顔顔進捗こんな感じです6', {
  //   headers: { 'X-MICROCMS-API-KEY': process.env.NEXT_PUBLIC_MICROCMS_API_KEY },
  // }).then((res) => res.json())
  const test = fetch(`https://menbeau.microcms.io/api/v1/contents/?q=${searchText}`, {
    headers: {
      'X-MICROCMS-API-KEY': process.env.NEXT_PUBLIC_MICROCMS_API_KEY ?? '',
    },
  }).then((res) => res)
  console.log(test)
  // .then((res) => console.log(res))
  // .then((res) => console.log(res))
  // const searchParams = useSearchParams()
  // const { data, error } = useSWR(['api/search-posts', searchParams.get('q')], fetcher)
  // console.log(data)
  return <div>SearchPosts</div>
}
