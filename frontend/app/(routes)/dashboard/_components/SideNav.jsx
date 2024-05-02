"use client"

import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import {React, useEffect} from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from "@auth0/nextjs-auth0/client";
import { Button } from '@/components/ui/button';
import Link from 'next/link'
import { getAccessToken } from '@auth0/nextjs-auth0/edge';
const jwt = require('jsonwebtoken');

function GetUserInformation() {
    const { user, error, isLoading } = useUser();
    const router = useRouter();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;
    return(
        user ? 
        <div className='fixed bottom-10 flex gap-2 items-center'>
                {user.picture && (
                <img src={user.picture} alt="User Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                )}
                <p style={{ margin: 2, marginLeft: '10px' }}>{user.name}</p>
                <a href="/api/auth/logout?returnTo=/dashboard" rel="noopener noreferrer" style={{ textDecoration: 'none' }}><Button>Logout</Button></a>
        </div>
        : 
        <div className='fixed bottom-10 flex gap-2 items-center'>
                <a href="/api/auth/login?returnTo=/dashboard" rel="noopener noreferrer" style={{ textDecoration: 'none' }}><Button>Login</Button></a>
        </div>

    )
}


function SideNav() {
    
  const menuList = [
    {
        id: 1,
        name: 'Dashboard',
        icon: LayoutGrid,
        path: '/dashboard'
    },
    {
        id: 2,
        name: 'Budgets',
        icon: PiggyBank,
        path: '/dashboard/budgets'
    },
    {
        id: 3,
        name: 'Expenses',
        icon: ReceiptText,
        path: '/dashboard/expenses'
    },
    {
        id: 4,
        name: 'Upgrade',
        icon: ShieldCheck,
        path: '/dashboard/upgrade'
    }
  ]
  const path=usePathname()
  useEffect(() => {
    console.log(path)
  }, [path])

  return (
    <div className='h-screen p-5 border shadow-sm'>
        <Image src ={'/logo.svg'}
        alt='logo'
        width={160}
        height={160}
        />
        <div className='mt-5'>
            {menuList.map((menu, index)=>(
                <Link href={menu.path}>
                <h2 className={`flex gap-2 items-center text-gray-500 font-medium md-5 p-5 cursor-pointer 
                rounded-md hover:text-primary hover:bg-blue-100 
                ${path==menu.path&&'text-primary bg-blue-100'}
                `}>
                    <menu.icon/>
                    {menu.name}
                </h2>
                </Link>
            ))}
        </div>
        <div>
            {GetUserInformation()}
        </div>
    </div>
  )
}

export default SideNav