"use client"
import React, { useEffect } from 'react'
import SideNav from './_components/SideNav'
import DashBoardHeader from './_components/DashBoardHeader'
import { useRouter } from 'next/navigation'

function DashboardLayout({children}) {
  const result = []
  const router = useRouter()
//   useEffect(() => checkUserBugets())

  return (
    <div>
        <div className='fixed md:w-64 hidden md:block'>
            <SideNav/>
        </div>
        <div className='md:ml-64'>
            <DashBoardHeader/>
            {children}
        </div>
    </div>
  )
}

export default DashboardLayout