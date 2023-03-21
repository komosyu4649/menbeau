import '@/styles/index.scss'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { RecoilComponent } from '@/components/RecoilComponent'
import { lexend, notoSans } from '@/fonts'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja' className={`${notoSans.className} ${notoSans.variable} ${lexend.variable}`}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <RecoilComponent>
          <Header />
        </RecoilComponent>
        {children}
        <Footer />
      </body>
    </html>
  )
}
