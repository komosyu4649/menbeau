import Image from 'next/image'
import React from 'react'
import style from './page.module.scss'
import layoutStyle from '@/styles/Layout.module.scss'
import textStyle from '@/styles/Text.module.scss'
import titleStyle from '@/styles/Title.module.scss'

export default async function About() {
  return (
    <main className={style.main}>
      {/* about */}
      <section className={`${layoutStyle.md} ${style.about}`}>
        <h1 className={style.aboutTitle}>
          <span className={style.aboutTitleEn}>about</span>
          <span className={style.aboutTitleJa}>MENBEAUについて</span>
        </h1>
        <div className={style.aboutMain}>
          <Image
            className={style.aboutMainImage}
            src='/img/about/menbeau.jpg'
            alt='menbeau'
            width={480}
            height={360}
          />
          <div className={style.aboutMainContent}>
            <p className={`${textStyle.mdSpSm} ${style.aboutMainContentText}`}>
              MENBEAUは男性向け美容情報を発信するWebメディアです。 <br />
              <br />
              NETFLIXで「スタートアップ夢の扉」を観て、キムソンホさんが36才にも関わらず、あまりにキレイすぎて私もキレイになりたい！と思って、美容の勉強をはじめて日々実践する中で、多くの男性にとって役立つ情報が発信できると思い、このMENBEAUを運営しています。
              男性向けの美容方法や実際に使ってよかった美容品の紹介、美容業界の方々へのインタビューを元にコンテンツを作成しております。{' '}
              <br />
              <br />
              ひとりでも多くの男性をキレイで幸せにすることが目標です。
            </p>
          </div>
        </div>
      </section>
      {/* administrator */}
      <section className={`${layoutStyle.md} ${style.administrator}`}>
        <h2 className={`${titleStyle.borderMd} ${style.administratorTitle}`}>運営者情報</h2>
        <div className={style.administratorMain}>
          <Image
            className={style.administratorMainImage}
            src='/img/about/komosyu.jpg'
            alt='komosyu'
            width={240}
            height={240}
          />
          <div className={style.administratorMainContent}>
            <h3 className={style.administratorMainContentTitle}>komosyu</h3>
            <p className={`${textStyle.mdSpSm} ${style.administratorMainContentText}`}>
              1996年生まれ。 <br />
              Web制作会社でのWebディベロッパーの経験から男性向けWebメディア「MENBEAU」を制作。
              <br />
              美容が好きなので、MENBEAUにとどまらず世の男性が美しくなるためのサービスやアプリの開発にも積極的に取り組んでいきたいと思っています！
            </p>
          </div>
        </div>
      </section>
      {/* contact */}
      <section className={`${layoutStyle.md} ${style.contact}`}>
        <h2 className={`${titleStyle.borderMd} ${style.contactTitle}`}>お問い合わせ</h2>.
        <div className={style.contactMain}>
          <p className={`${textStyle.mdSpSm} ${style.contactMainText}`}>
            インタビューや商品紹介についてのご連絡は
            <a
              href='https://www.twitter.com/messages/compose?recipient_id=1583786873821966336'
              target='_blank'
              rel='noopener noreferrer'
              className={textStyle.link}
            >
              こちらから
            </a>
            お願いいたします。
          </p>
        </div>
      </section>
    </main>
  )
}
