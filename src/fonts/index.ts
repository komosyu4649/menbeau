import { Noto_Sans, Lexend } from '@next/font/google'

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
