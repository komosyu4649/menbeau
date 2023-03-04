import React from 'react'
import style from './layout.module.scss'
import { Sidebar } from '@/components/Sidebar'
import layoutStyle from '@/styles/Layout.module.scss'

export default async function CategoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${layoutStyle.lg} ${style.container}`}>
      <Sidebar />
      {children}
    </div>
  )
}
