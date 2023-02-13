import { Noto_Sans, Lexend } from '@next/font/google'
import { Suspense } from 'react'
import '@/styles/index.scss'
import { Header } from '@/components/Header'
import { MicroCMSCategoryData, MicroCMSKeywordsData } from '@/lib/microcms'
import { getMicroCMSData } from '@/lib/microcms/getData'

export const notoSans = Noto_Sans({
  variable: '--font-notoSans',
  subsets: ['latin'],
  // subsets: ['javanese'],
  weight: ['400', '700'],
})

export const lexend = Lexend({
  variable: '--font-lexend',
  subsets: ['latin'],
  weight: ['600'],
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const categoriesData: MicroCMSCategoryData = await getMicroCMSData('categories')
  const keywordsData: MicroCMSKeywordsData = await getMicroCMSData('keywords')

  return (
    <html lang='ja' className={`${notoSans.className} ${notoSans.variable} ${lexend.variable}`}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        {/* <Suspense fallback={null}> */}
        <Header categoriesData={categoriesData} keywordsData={keywordsData} />
        {/* <Header props='test' /> */}
        {/* </Suspense> */}
      </body>
    </html>
  )
}
