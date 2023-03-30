'use client'

import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { use, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import useSWR from 'swr'
import { PostNewItem } from './PostNewItem'
import style from './SearchPosts.module.scss'
import { MICROCMS_CONTENTS_TYPE_CONTENTS } from '@/constants'
import { MicroCMSContent } from '@/lib/microcms'
import { getMicroCMSDataSearch } from '@/lib/microcms/getData'
import { searchKeyword } from '@/store/seachKeyword'

// console.log(fetcher)

/**
 * TODO: これを参考に https://qiita.com/manak1/items/78623eb8f02db88eb879
 */
export const SearchPosts = () => {
  const searchParams = useSearchParams().get('q')
  const [searchContents, setSearchContents] = useState([])
  const searchText = useRecoilValue(searchKeyword)

  const contentsSearch = async () => {
    const res = await axios.get('/api/search-posts', {
      params: {
        searchParams,
      },
    })
    setSearchContents(res.data.contents)
  }
  contentsSearch()

  return (
    <div className={style.container}>
      <ul className={style.list}>
        {searchContents.map((content: MicroCMSContent) => (
          <li key={content.id} className={style.item}>
            <PostNewItem content={content} />
          </li>
        ))}
      </ul>
    </div>
  )
}
