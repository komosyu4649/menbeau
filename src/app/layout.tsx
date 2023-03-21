import '@/styles/index.scss'
import { ClientCom } from '@/components/RecoilComponent'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
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
        <ClientCom>
          <Header />
        </ClientCom>
        {children}
        <Footer />
      </body>
    </html>
  )
}
