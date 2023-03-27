'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import useSWR from 'swr'

const fetcher = (url: string, searchText: string) => {
  return fetch(`${url}?q=${searchText}`).then((res) => res.json())
}
// console.log(fetcher)

export const SearchPosts = () => {
  const searchParams = useSearchParams()
  const { data, error } = useSWR(['api/search-posts', searchParams.get('q')], fetcher)
  console.log(data)
  return <div>SearchPosts</div>
}
