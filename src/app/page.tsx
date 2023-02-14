import fs from 'fs'
import { Inter } from '@next/font/google'
import type { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import styles from './page.module.css'
import { MicroCMSContentsData } from '@/lib/microcms'
import { client } from '@/lib/microcms/apis'
import { getMicroCMSData } from '@/lib/microcms/getData'

const inter = Inter({ subsets: ['latin'] })

export default async function Home() {
  const categoriesData = await getMicroCMSData('categories')
  fs.writeFileSync('public/json/microCMSCategoryData.json', JSON.stringify(categoriesData))
  const keywordsData = await getMicroCMSData('keywords')
  fs.writeFileSync('public/json/microCMSKeywordData.json', JSON.stringify(keywordsData))
  const contentsData: MicroCMSContentsData = await getMicroCMSData('contents')
  // console.log(contentsData.contents)
  return <main className={styles.main}></main>
}
