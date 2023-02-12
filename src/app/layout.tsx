import '@styles/index.scss'
import { Suspense } from 'react'
import { Header } from '@components/Header'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
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
