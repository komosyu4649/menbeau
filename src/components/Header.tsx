'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { use, useCallback } from 'react'
import { useRecoilState } from 'recoil'
import style from './Header.module.scss'
import { HeaderCategoryMenu } from './HeaderCategoryMenu'
import { HeaderKeywordMenu } from './HeaderKeywordMenu'
import { MICROCMS_CONTENTS_TYPE_CONTENTS } from '@/constants'
import { useHeaderMenuHidden } from '@/hooks/useHeaderMenuHidden'
import { getMicroCMSDataSearch } from '@/lib/microcms/getData'
import { searchKeyword } from '@/store/seachKeyword'

/**
 * TODO: categoryとkeywordsをrscに書き換えたい。バケツリレーになるからグローバルで持っておく
 * @returns
 */
export const Header: React.FC = () => {
  type OtherMenu = {
    href: string
    target?: boolean
    name: string
  }
  const otherMenus: OtherMenu[] = [
    {
      href: '/',
      name: 'ホーム',
    },
    {
      href: '/about/',
      name: 'MINBIYOについて',
    },
    {
      href: 'https://twitter.com/messages/compose?recipient_id=1583786873821966336',
      target: true,
      name: 'お問い合わせ',
    },
  ]

  const { handleClickVisibleMenu, menuHidden } = useHeaderMenuHidden()

  const [searchText, setSearchText] = useRecoilState(searchKeyword)
  const router = useRouter()

  const onChangeSearchText = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }, [])

  const onSubmitSearch = useCallback(
    (e: React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault()
      router.push(`search?q=${searchText}`)
    },
    [searchText, router],
  )

  const onKeydownSearch = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        router.push(`search?q=${searchText}`)
      }
    },
    [searchText, router],
  )

  return (
    <header className={style.container}>
      {/* logo */}
      <Link href='/' className={style.logo}>
        <svg
          width='139'
          height='21'
          viewBox='0 0 139 21'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className={style.logoInside}
        >
          <path
            d='M0.464 20V0.399999H4.72L11.86 12.02L8.808 11.992L16.032 0.399999H20.12V20H15.5V13.896C15.5 12.216 15.5373 10.704 15.612 9.36C15.7053 8.016 15.8547 6.68133 16.06 5.356L16.592 6.812L11.16 15.24H9.312L3.992 6.868L4.524 5.356C4.72933 6.60667 4.86933 7.89467 4.944 9.22C5.03733 10.5267 5.084 12.0853 5.084 13.896V20H0.464ZM25.046 20V0.399999H38.71V4.46H29.666V15.94H38.99V20H25.046ZM27.286 11.964V8.1H37.45V11.964H27.286ZM43.0929 20V0.399999H47.3489L57.6249 14.4L56.7009 14.26C56.6076 13.644 56.5329 13.056 56.4769 12.496C56.4209 11.936 56.3649 11.3853 56.3089 10.844C56.2716 10.3027 56.2342 9.752 56.1969 9.192C56.1782 8.632 56.1596 8.02533 56.1409 7.372C56.1409 6.71867 56.1409 6.00933 56.1409 5.244V0.399999H60.7609V20H56.4489L45.7249 5.552L47.1529 5.748C47.2462 6.644 47.3209 7.40933 47.3769 8.044C47.4516 8.66 47.5076 9.21067 47.5449 9.696C47.6009 10.1813 47.6382 10.62 47.6569 11.012C47.6756 11.404 47.6849 11.796 47.6849 12.188C47.7036 12.5613 47.7129 12.9813 47.7129 13.448V20H43.0929ZM65.6788 20V0.399999H74.3308C75.6748 0.399999 76.8135 0.595999 77.7468 0.987999C78.6802 1.36133 79.3802 1.912 79.8468 2.64C80.3322 3.34933 80.5748 4.208 80.5748 5.216C80.5748 6.336 80.2948 7.27867 79.7348 8.044C79.1935 8.80933 78.4002 9.32267 77.3548 9.584L77.2988 9.052C78.1762 9.23867 78.9322 9.56533 79.5668 10.032C80.2202 10.4987 80.7242 11.0773 81.0788 11.768C81.4335 12.44 81.6108 13.2053 81.6108 14.064C81.6108 15.0533 81.4428 15.9213 81.1068 16.668C80.7708 17.396 80.2855 18.012 79.6508 18.516C79.0162 19.02 78.2695 19.3933 77.4108 19.636C76.5708 19.8787 75.6375 20 74.6108 20H65.6788ZM70.1588 16.024H74.4428C74.9655 16.024 75.4042 15.94 75.7588 15.772C76.1322 15.604 76.4215 15.3613 76.6268 15.044C76.8322 14.708 76.9348 14.3067 76.9348 13.84C76.9348 13.4107 76.8228 13.0467 76.5988 12.748C76.3935 12.4493 76.0948 12.2253 75.7028 12.076C75.3108 11.908 74.8442 11.824 74.3028 11.824H70.1588V16.024ZM70.1588 8.268H73.6588C74.1442 8.268 74.5548 8.19333 74.8908 8.044C75.2455 7.876 75.5068 7.652 75.6748 7.372C75.8615 7.07333 75.9548 6.71867 75.9548 6.308C75.9548 5.71067 75.7495 5.244 75.3388 4.908C74.9282 4.55333 74.3122 4.376 73.4908 4.376H70.1588V8.268ZM85.3117 20V0.399999H98.9757V4.46H89.9317V15.94H99.2557V20H85.3117ZM87.5517 11.964V8.1H97.7157V11.964H87.5517ZM100.867 20L108.623 0.399999H112.655L120.355 20H115.539L111.843 10.06C111.693 9.668 111.544 9.248 111.395 8.8C111.245 8.352 111.096 7.89467 110.947 7.428C110.797 6.94267 110.648 6.476 110.499 6.028C110.368 5.56133 110.256 5.132 110.163 4.74L111.003 4.712C110.891 5.17867 110.76 5.636 110.611 6.084C110.48 6.532 110.34 6.98 110.191 7.428C110.06 7.85733 109.911 8.296 109.743 8.744C109.575 9.17333 109.416 9.62133 109.267 10.088L105.571 20H100.867ZM104.563 16.248L106.047 12.664H115.063L116.519 16.248H104.563ZM130.513 20.168C128.889 20.168 127.442 19.8413 126.173 19.188C124.904 18.516 123.905 17.6013 123.177 16.444C122.468 15.2867 122.113 13.9613 122.113 12.468V0.399999H126.929V12.216C126.929 12.9253 127.088 13.5693 127.405 14.148C127.722 14.708 128.152 15.156 128.693 15.492C129.234 15.8093 129.841 15.968 130.513 15.968C131.222 15.968 131.848 15.8093 132.389 15.492C132.949 15.156 133.397 14.708 133.733 14.148C134.069 13.5693 134.237 12.9253 134.237 12.216V0.399999H138.885V12.468C138.885 13.9613 138.521 15.2867 137.793 16.444C137.084 17.6013 136.094 18.516 134.825 19.188C133.556 19.8413 132.118 20.168 130.513 20.168Z'
            fill='black'
          />
        </svg>
      </Link>
      {/* button */}
      <button className={style.buttonToggleMenu} onClick={handleClickVisibleMenu}>
        <span className={style.buttonToggleMenuLine}></span>
        <span className={style.buttonToggleMenuLine}></span>
      </button>
      {/* menu */}
      {menuHidden && (
        <nav className={style.menu}>
          <div className={style.menuInner}>
            {/* categories */}
            <HeaderCategoryMenu />
            {/* keywords */}
            <HeaderKeywordMenu />
            {/* others */}
            <div className={style.menuOthers}>
              {/* menu */}
              <div className={style.menuOthersNav}>
                <ul className={style.menuOthersNavList}>
                  {otherMenus.map((otherMenu) => (
                    <li key={otherMenu.name} className={style.menuOthersNavItem}>
                      {otherMenu.target ? (
                        <a
                          href={otherMenu.href}
                          target='_blank'
                          className={style.menuOthersNavItemLink}
                          onClick={handleClickVisibleMenu}
                        >
                          {otherMenu.name}
                        </a>
                      ) : (
                        <Link
                          href={otherMenu.href}
                          className={style.menuOthersNavItemLink}
                          onClick={handleClickVisibleMenu}
                        >
                          {otherMenu.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              {/* search */}
              {/* <form action='' className={style.menuSearch} onSubmit={onSubmitSearch}>
                <input
                  type='text'
                  className={style.menuSearchInput}
                  placeholder='キーワードを入力してください'
                  onChange={onChangeSearchText}
                  onKeyDown={onKeydownSearch}
                />
                <button className={style.menuSearchButton}>
                  <svg
                    width='40'
                    height='40'
                    viewBox='0 0 40 40'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <circle cx='20' cy='20' r='20' fill='#231815' />
                    <circle cx='19.0057' cy='18.0057' r='8.00567' fill='white' />
                    <circle cx='19.0056' cy='18.0057' r='6.40454' fill='#231815' />
                    <line
                      x1='24.5162'
                      y1='23.7031'
                      x2='28.7588'
                      y2='27.9457'
                      stroke='white'
                      strokeWidth='2'
                    />
                  </svg>
                </button>
              </form> */}
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
