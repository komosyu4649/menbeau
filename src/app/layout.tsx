import { Noto_Sans_Javanese, Lexend } from '@next/font/google'
import { Suspense } from 'react'
import '@styles/index.scss'
import { Header } from '@/components/Header'

const notoSansJa = Noto_Sans_Javanese({
  variable: '--font-notoSansJa',
  // subsets: ['latin'],
  subsets: ['javanese'],
  weight: ['400', '700'],
})

const lexend = Lexend({
  variable: '--font-lexend',
  subsets: ['latin'],
  weight: ['600'],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja' className={`${notoSansJa.className} ${notoSansJa.variable} ${lexend.variable}`}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Suspense fallback={null}>
          {/* @ts-expect-error Server Component */}
          <Header />
        </Suspense>
      </body>
    </html>
  )
}
