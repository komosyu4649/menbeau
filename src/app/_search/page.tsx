import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import useSWR from 'swr'
import { SearchPosts } from '@/components/SearchPosts'
import layoutStyle from '@/styles/Layout.module.scss'

export default async function Search() {
  return (
    <div className={layoutStyle.lg}>
      <SearchPosts />
    </div>
  )
}
