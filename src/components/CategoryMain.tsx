import React from 'react'
import style from './CategoryMain.module.scss'
import { PostEntertainmentItem } from './PostEntertainmentItem'
import { PostInterviewItem } from './PostInterviewItem'
import { PostKnowhowItem } from './PostKnowhowItem'
import { PostNewItem } from './PostNewItem'
import { PostProductsItem } from './PostProductsItem'
import { PostProgressItem } from './PostProgressItem'
import { MicroCMSContent } from '@/lib/microcms'

type Props = {
  contents: MicroCMSContent[]
  categoryName: string
}

export const CategoryMain: React.FC<Props> = ({ contents, categoryName }) => {
  const PostItem = (content: MicroCMSContent) => {
    switch (categoryName) {
      case 'all':
        return <PostNewItem content={content} />
      case 'interview':
        return <PostInterviewItem content={content} />
      case 'entertainment':
        return <PostEntertainmentItem content={content} />
      case 'knowhow':
        return <PostKnowhowItem content={content} />
      case 'products':
        return <PostProductsItem content={content} />
      case 'progress':
        return <PostProgressItem content={content} />
    }
  }
  return (
    <div className={`${style.container} ${style[`${categoryName}`]}`}>
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
