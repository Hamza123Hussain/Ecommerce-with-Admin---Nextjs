import React from 'react'

export default function Loading() {
  return (
    <div className=" flex justify-center items-center m-10">
      <span className="loader"></span> <span className="loader"></span>{' '}
      <span className="loader"></span> <span className="loader"></span>{' '}
      <span className="loader"></span> <span className="loader"></span>
    </div>
  )
}
