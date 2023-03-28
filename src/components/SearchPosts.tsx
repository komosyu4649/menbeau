'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import useSWR from 'swr'
import { searchKeyword } from '@/store/seachKeyword'

// console.log(fetcher)

/**
 * TODO: これを参考に https://qiita.com/manak1/items/78623eb8f02db88eb879
 */
export const SearchPosts = () => {
  const searchText = useRecoilValue(searchKeyword)
  // console.log(1, searchText)

  // const fetcher = (url: string, searchText: string) => {
  //   return fetch(`${url}?q=${searchText}`).then((res) => res.json())
  // }
  const fetcher = () => fetch('/api/search-posts')

  // console.log(test)
  // .then((res) => console.log(res))
  // .then((res) => console.log(res))
  const searchParams = useSearchParams()
  const { data, error } = useSWR(['api/search-posts', searchParams.get('q')], fetcher)
  // console.log(data)
  return <div>SearchPosts</div>
}
