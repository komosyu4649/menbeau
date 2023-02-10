import { Inter } from '@next/font/google'
import type { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import styles from './page.module.css'
import { client } from 'src/lib/microcms/apis'

const inter = Inter({ subsets: ['latin'] })

// async function getData() {
//   const res = await client.getList({ endpoint: 'categories' })
//   return res
// }

export default async function Home() {
  // const data = await getData()
  // console.log(first)
  return <main className={styles.main}></main>
}

// export const getStaticProps: GetStaticProps<any> = async () => {
//   const { data } = await client.getList({ endpoint: 'categories' })
//   console.log(data)
//   return {
//     props: { data },
//   }
// }
