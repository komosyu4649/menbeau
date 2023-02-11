import { Inter } from '@next/font/google'
import type { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import { MicroCMSContentsData } from '../types/microcms/index'
import styles from './page.module.css'
import { client } from 'src/lib/microcms/apis'
import { getMicroCMSData } from 'src/lib/microcms/getData'

const inter = Inter({ subsets: ['latin'] })

export default async function Home() {
  const contentsData: MicroCMSContentsData = await getMicroCMSData('contents')
  // console.log(contentsData.contents)
  return <main className={styles.main}></main>
}
