import React from 'react'
export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="animate-spin rounded-full border-t-8 border-gray-600 h-20 w-20"></div>
      <div className="animate-spin rounded-full border-t-8 border-gray-600 h-20 w-20 ml-4"></div>
      <div className="animate-spin rounded-full border-t-8 border-gray-600 h-20 w-20 ml-4"></div>
      <div className="animate-spin rounded-full border-t-8 border-gray-600 h-20 w-20 ml-4"></div>
    </div>
  )
}
