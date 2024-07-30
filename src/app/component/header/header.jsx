'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import supabase from '../../api/supabaseaApi';
import useUserSession from '../../hooks/authdata'
import Image from "next/image";
import Link from "next/link";
import {logout} from "../../login/actions"



export default function Header() {
  const router = useRouter();



  return (
    <>
  <nav className="bg-gray-800">
  


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
