import React from 'react'
import style from './CategoryMain.module.scss'
import { PostEntertainmentItem } from './PostEntertainmentItem'
import { PostInterviewItem } from './PostInterviewItem'
import { PostKnowhowItem } from './PostKnowhowItem'
import { PostNewItem } from './PostNewItem'
import { PostProgressItem } from './PostProgressItem'
import { MicroCMSCategoryData } from '@/lib/microcms'

export const CategoryMain = ({ contents, categoryName }) => {
  const PostItem = (content: MicroCMSCategoryData) => {
    switch (categoryName) {
      case 'all':
        return <PostNewItem content={content} />
      case 'interview':
        return <PostInterviewItem content={content} />
      case 'entertainment':
        return <PostEntertainmentItem content={content} />
      case 'knowhow':
        return <PostKnowhowItem content={content} />
      case 'progress':
        return <PostProgressItem content={content} />
    }
  }
  return (
    <div className={style.container}>
      <ul className={style.list}>
        {contents.map((content) => (
          <li key={content.id} className={style.item}>
            {PostItem(content)}
          </li>
        ))}
      </ul>
    </div>
  )
}
