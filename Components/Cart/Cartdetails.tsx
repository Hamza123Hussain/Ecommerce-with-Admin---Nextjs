'use client'
import useCartService from '@/libs/Hooks/UseCartStore'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Cartdetails() {
  const router = useRouter()
  const {
    items,
    itemsPrice,
    totalPrice,
    increase,
    decrease,
    shippingPrice,
    taxPrice,
    clear,
  } = useCartService()

  if (items.length == 0) {
    return (
      <div>
        <h1>CART IS EMPTY</h1>
        <Link href={'/'}>Start Shopping </Link>
      </div>
    )
  }

  const cartitems = items.map((ele) => {
    return (
      <>
        {' '}
        <tbody className="divide-y divide-gray-200">
          {/* Example product row */}
          <tr>
            <Link href={`product/${ele.slug}`}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex-shrink-0 h-16 w-16">
                  <img
                    className="h-30 w-30 object-cover"
                    src={ele.image}
                    alt="Product"
                  />
                </div>
              </td>{' '}
            </Link>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-white">{ele.name}</div>
            </td>

            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-white">${ele.price}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <button
                  onClick={() => decrease(ele)}
                  className="text-gray-500 focus:outline-none focus:text-gray-600"
                >
                  -
                </button>
                <span className="mx-2 text-white">{ele.qty}</span>
                <button
                  onClick={() => increase(ele)}
                  className="text-gray-500 focus:outline-none focus:text-gray-600"
                >
                  +
                </button>
              </div>
            </td>
          </tr>
          {/* End of example product row */}
        </tbody>
      </>
    )
  })
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8">
        <h1 className="text-2xl font-bold mb-8">Cart Items</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-black rounded-xl overflow-hidden">
            <thead className="bg-black">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
              </tr>
            </thead>
            {cartitems}
          </table>
        </div>
        <div className="flex justify-end mt-8">
          <div className="flex flex-col items-end">
            <div className="text-sm text-white mb-2">
              Before Tax: ${itemsPrice}
            </div>
            <div className="text-sm text-white mb-2">Tax: ${taxPrice}</div>
            <div className="text-sm text-white mb-2">
              Shipping: ${shippingPrice}
            </div>
            <hr className="my-4" />
            <div className="text-lg font-bold mb-2">
              {' '}
              Number of items : {items.reduce((a, c) => a + c.qty, 0)}
            </div>
            <div className="text-lg font-bold mb-2">
              Total:$
              {totalPrice}
            </div>
            <div className=" flex justify-center gap-2">
              <button
                onClick={clear}
                className="px-6 py-3 bg-red-800 text-white font-bold rounded-md hover:bg-red-700"
              >
                Clear Cart
              </button>
              <button
                onClick={() => {
                  router.push('/Shipping')
                }}
                className="px-6 py-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
