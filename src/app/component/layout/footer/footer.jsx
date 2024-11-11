'use client'
import React from "react";
import Link from "next/link";

export default function Footer() {

  return (
    <footer className="absolute bottom-0 left-0 w-full bg-gray-100 h-[60px]">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-600 mb-4 md:mb-0">
          © 2024 Dev JinHan. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Link 
              href="/legal/privacy" 
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              개인정보처리방침
            </Link>
            <Link 
              href="/legal/terms" 
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              이용약관
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
