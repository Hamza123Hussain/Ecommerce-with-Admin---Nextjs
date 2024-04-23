'use client'
import { Product } from '@/libs/models/ProductModel'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Productitem({ product }: { product: Product }) {
  const { data: session } = useSession()
  return (
    <>
      <div className="bg-white shadow-[0_2px_15px_-6px_rgba(0,0,0,0.2)] w-full py-6 max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
        <div className="flex items-center gap-2 px-6">
          <h3 className="text-2xl text-[#333] font-extrabold flex-1">
            {product.name}
          </h3>
        </div>
        <Link href={`product/${product.slug}`}>
          {' '}
          <img
            src={product.image}
            className="w-full my-6"
            alt={product.slug}
            style={{ width: '400px', height: '400px' }}
          />{' '}
        </Link>
        <div className="px-6">
          <p className="text-sm text-gray-500">{product.description}</p>
          <div className="mt-10 flex items-center flex-wrap gap-4">
            <h3 className="text-xl text-[#333] font-bold flex-1">
              ${product.price}
            </h3>
            {session?.user?.name?.toLowerCase() == 'hamza' ? (
              <Link href={`product/edit/${product.slug}`}>
                <button
                  type="button"
                  className="px-6 py-2.5 rounded bg-blue-900 text-white brightness-50 text-sm tracking-wider font-semibold border-2 border-[#333] hover:bg-blue-500 hover:brightness-150 outline-none"
                >
                  Edit Product
                </button>
              </Link>
            ) : (
              <Link href={`product/${product.slug}`}>
                <button
                  type="button"
                  className="px-6 py-2.5 rounded text-[#333] text-sm tracking-wider font-semibold border-2 border-[#333] hover:bg-gray-50 outline-none"
                >
                  Order now
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
