"use client";

import { AuthContext } from '@/context/AuthContext'
import Image from 'next/image'
import React, { useContext } from 'react'

function Header() {
  const {user} = useContext(AuthContext)
  
  return (
    <div className='flex  justify-between items-center p-4'>
      <Image src={'/logo.svg'} alt="logo" width={50} height={50} priority/>
      {user?.picture && (
        <Image 
          src={user.picture} 
          alt="User profile" 
          width={50} 
          height={50} 
          className='rounded-full'
        />
      )}
    </div>
  )
}

export default Header
