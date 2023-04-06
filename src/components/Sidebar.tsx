import React from 'react'
import style from './Sidebar.module.scss'
import { SidebarCategory } from './SidebarCategory'
import { SidebarKeyword } from './SidebarKeyword'

export const Sidebar: React.FC = () => {
  return (
    <div className={style.container}>
      <SidebarCategory />
      <SidebarKeyword />
    </div>
  )
}
