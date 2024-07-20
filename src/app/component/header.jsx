'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import supabase from '../api/supabaseaApi';
import useUserSession from '../hooks/authdata'
import Image from "next/image";
import Link from "next/link";
import {logout} from "../login/actions"



export default function Header() {
  const router = useRouter();
  const { loggedIn, userName } = useUserSession();



  return (
    <>
  <nav className="bg-gray-800">
  
  {loggedIn && (
    <>
    <div className='fixed bottom-10 right-40 z-50 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br  min-w-14 focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium  text-sm  px-7 py-2.5 rounded text-center w-26 me-2 mb-2'>{userName}</div>
        <div onClick={logout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded absolute left-2/3 z-40 top-4 min-w-14">
          로그아웃
        </div>
        </>
      )}

  <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    <div className="relative flex h-16 items-center justify-between w-full">

      <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        <div className="flex flex-shrink-0 items-center">
        </div>
        <div className="sm:ml-6 sm:block">
          <div className="flex space-x-4 w-full" >
            <Link href="/" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300  hover:bg-gray-700 hover:text-white">Dashboard</Link>
            <Link href="/about" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Team</Link>
            <Link href="/" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Projects</Link>
            <Link href="/" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Calendar</Link>
          </div>
        </div>
      </div>

   

    </div>
  </div>

</nav>
    </>
  );
}
