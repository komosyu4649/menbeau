'use client'

import React from 'react'
import { RecoilRoot } from 'recoil'
import { HeaderCategoryMenu } from './HeaderCategoryMenu'

export const ClientCom = ({ children }: { children: React.ReactNode }) => {
  return <RecoilRoot>{children}</RecoilRoot>
}
