import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import useSWR from 'swr'
import { SearchPosts } from '@/components/SearchPosts'

// const fetcher = (url: string, searchText: string) => {
//   return fetch(`${url}?q=${searchText}`).then((res) => res.json())
// }

export default async function Search() {
  //   const router = useRouter()
  //   const searchParams = useSearchParams()
  //   console.log(searchParams)
  //   const { data, error } = useSWR(['api/search-posts', router.query.q], fetcher)
  return (
    <main>
      <span>test</span>
      <SearchPosts />
    </main>
  )
}
