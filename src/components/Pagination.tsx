'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import style from './Pagination.module.scss'
import { PER_PAGE } from '@/constants'
import textStyle from '@/styles/Text.module.scss'

type Props = {
  totalCount: number
  pageName: string
  currentNumber: number
}

export const Pagination: React.FC<Props> = ({ totalCount, pageName, currentNumber }) => {
  const router = usePathname()
  const allPageNumber: number = Math.ceil(totalCount / PER_PAGE)
  let pageNumber: number
  if (!router?.includes('page')) {
    pageNumber = 1
  } else {
    pageNumber = currentNumber
  }
  const paginationGenerator = (pageNumber: number, allPageNumber: number, width = 2) => {
    const left = pageNumber - width
    const right = pageNumber + width + 1
    const ranges = []
    const rangeWithDots: any = []
    let length: number
    for (let i = 1; i <= allPageNumber; i += 1) {
      if (i === 1 || i === allPageNumber || (i >= left && i <= right)) {
        ranges.push(i)
      } else if (i < left) {
        i = left - 1
      } else if (i > right) {
        ranges.push(allPageNumber)
        break
      }
    }
    ranges.forEach((range) => {
      if (length) {
        if (range - length === 3) {
          rangeWithDots.push(length + 1)
        } else if (range - length !== 1) {
          rangeWithDots.push('...')
        }
      }
      rangeWithDots.push(range)
      length = range
    })
    return rangeWithDots
  }

  return (
    <>
      {allPageNumber > 1 && (
        <nav className={style.container}>
          <Link
            href={`/${pageName}/page/${pageNumber - 1}`}
            className={`${style.prev} ${style.itemLink} ${pageNumber === 1 && style.current}`}
          >
            <svg
              width='8'
              height='14'
              viewBox='0 0 8 14'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M7 1L1 7L7 13' stroke='black' />
            </svg>
          </Link>
          <ul className={style.list}>
            {paginationGenerator(pageNumber, allPageNumber).map((page: number, index: number) => (
              <li key={index} className={style.item}>
                {typeof page === 'number' ? (
                  <Link
                    href={`/${pageName}/page/${page}`}
                    className={`${textStyle.enMd} ${style.itemLink} ${
                      page === pageNumber && style.current
                    }`}
                  >
                    {page}
                  </Link>
                ) : (
                  <span className={`${textStyle.enMd} ${style.itemDott}`}>{page}</span>
                )}
              </li>
            ))}
          </ul>
          <Link
            href={`/${pageName}/page/${pageNumber + 1}`}
            className={`${style.next} ${style.itemLink} ${
              pageNumber === allPageNumber && style.current
            }`}
          >
            <svg
              width='8'
              height='14'
              viewBox='0 0 8 14'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M1 13L7 7L0.999999 1' stroke='black' />
            </svg>
          </Link>
        </nav>
      )}
    </>
  )
}
