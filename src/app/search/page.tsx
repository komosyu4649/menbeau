import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import useSWR from 'swr'
import { SearchPosts } from '@/components/SearchPosts'
import layoutStyle from '@/styles/Layout.module.scss'

// const fetcher = (url: string, searchText: string) => {
//   return fetch(`${url}?q=${searchText}`).then((res) => res.json())
// }

export default async function Search() {
  //   const router = useRouter()
  //   const searchParams = useSearchParams()
  //   console.log(searchParams)
  //   const { data, error } = useSWR(['api/search-posts', router.query.q], fetcher)
  return (
    <div className={layoutStyle.lg}>
      <SearchPosts />
    </div>
  )
}
