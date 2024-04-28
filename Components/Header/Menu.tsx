'use client'
import useCartService from '@/libs/Hooks/UseCartStore'
import Link from 'next/link'
import React from 'react'

export default function Menu() {
  const { items } = useCartService()

  return (
    <div>
      <ul className="flex items-stretch">
        <li>
          <Link className="btn btn-ghost rounded-btn" href={'/cart'}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              id="cart"
              fill="white"
            >
              <path d="M14 36c-2.21 0-3.98 1.79-3.98 4s1.77 4 3.98 4 4-1.79 4-4-1.79-4-4-4zM2 4v4h4l7.19 15.17-2.7 4.9c-.31.58-.49 1.23-.49 1.93 0 2.21 1.79 4 4 4h24v-4H14.85c-.28 0-.5-.22-.5-.5 0-.09.02-.17.06-.24L16.2 26h14.9c1.5 0 2.81-.83 3.5-2.06l7.15-12.98c.16-.28.25-.61.25-.96a2 2 0 0 0-2-2H10.43l-1.9-4H2zm32 32c-2.21 0-3.98 1.79-3.98 4s1.77 4 3.98 4 4-1.79 4-4-1.79-4-4-4z"></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </svg>
            {items.length !== 0 && (
              <sup className="  text-green-900   relative right-10 text-sm ">
                {items.reduce((cartitems, item) => cartitems + item.qty, 0)}
              </sup>
            )}
          </Link>
        </li>
      </ul>
    </div>
  )
}
