import { useCallback, useState } from 'react'
import { atom, useRecoilState } from 'recoil'

// const [menuHidden, setMenuHidden] = useState(false)
// const handleClickVisibleMenu = useCallback(() => setMenuHidden((prev) => !prev), [])

export const headerMenuOpen = atom({
  key: 'header-menu-state',
  default: false,
})
