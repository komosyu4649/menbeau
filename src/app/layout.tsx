import '@/styles/index.scss'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { RecoilComponent } from '@/components/RecoilComponent'
import { lexend, notoSans } from '@/fonts'

const siteName = '男性美容WebメディアMENBEAU'
const description = '男性向けの美容に役立つ情報を発信しているWebメディア'
const url = 'https://menbeau.jp'
const ogImageUrl = 'https://menbeau.jp/ogp.png'

export const metadata = {
  title: {
    default: siteName,
    /** `next-seo`の`titleTemplate`に相当する機能 */
    template: `%s - ${siteName}`,
  },
  description,
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: siteName,
    description,
    url,
    siteName,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'menbeau',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description,
    site: '@komosyu4649',
    creator: '@komosyu4649',
    images: [ogImageUrl],
  },
  // verification: {
  //   google: 'サーチコンソールのやつ',
  // },
  // alternates: {
  //   canonical: url,
  // },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja' className={`${notoSans.className} ${notoSans.variable} ${lexend.variable}`}>
      <head />
      <body>
        <RecoilComponent>
          <Header />
          {children}
          <Footer />
        </RecoilComponent>
      </body>
    </html>
  )
}
