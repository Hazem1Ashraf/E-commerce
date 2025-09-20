"use client"
import Image from 'next/image'
import React from 'react'
import errorImage from "../../../public/error.svg"
export default function error() {
  return (
        <div className="flex-col justify-center items-center bg-gray-50 z-50">
      <Image 
        src={errorImage}
        alt="Error" 
        className="w-[70%] h-[70%] mx-auto my-2"
      />
    </div>
  )
}
