import { useCallback } from 'react'
import { useRecoilState } from 'recoil'
import { headerMenuOpen } from '@/store/headerMenuState'

export const useHeaderMenuHidden = () => {
  const [menuHidden, setMenuHidden] = useRecoilState(headerMenuOpen)
  const handleClickVisibleMenu = useCallback(() => setMenuHidden((menuHidden) => !menuHidden), [])
  return { handleClickVisibleMenu, menuHidden }
}
