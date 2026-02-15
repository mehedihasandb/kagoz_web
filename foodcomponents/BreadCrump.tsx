'use client'
import Link from 'next/link';
import React from 'react'
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

interface BreadcrumbProps {
  pageName:string;
  link?:string;
  lastName?:string;
}
export default function BreadCrump({ pageName, link, lastName }: BreadcrumbProps) {
  return (
    <div className='bg-white text-gray-700 border-t'>
      <div className='uppercase p-3 lg:py-6'>
        <div className='flex justify-center items-center uppercase text-xl p-2'>
          <p>{pageName}</p>
        </div>
        <div className='flex justify-center items-center uppercase font-semibold'>
          <Link href='/ecommerce'>
          <p>Home</p>
          </Link>
          <MdKeyboardDoubleArrowRight className='mx-2' />
          <p>{lastName}</p>
        </div>
      </div>
    </div>
  )
}
