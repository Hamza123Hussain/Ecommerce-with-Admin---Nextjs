'use client'
import { Order, OrderItem } from '@/libs/models/OrderModel'
import { Product } from '@/libs/models/ProductModel'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Products = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(true)
  const [orderData, setOrderData] = useState<any>([])
  const [routerMounted, setRouterMounted] = useState(false) // State to track if the router is mounted

  useEffect(() => {
    setRouterMounted(true) // Set routerMounted to true when component is mounted
  }, [])

  const getData = async () => {
    try {
      const res = await fetch('/api/Admin', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()

      if (res.ok) {
        setOrderData(data.Data)
        setLoading(false)
      } else {
        console.log('No data received')
      }
    } catch (error: any) {
      console.error(error)
      setLoading(false)
    }
  }

  //   const handleclick = (id: any) => {
  //     const routename = '/'
  //     if (router.pathname == '/Admin/OrderHistory') {
  //       router.push(`${routename}/${id}`)
  //     }
  //   }

  useEffect(() => {
    if (routerMounted) {
      // Only execute router-related logic if the router is mounted
      getData()
    }
  }, [routerMounted]) // Run this effect when routerMounted changes

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <div className="animate-spin rounded-full border-t-8 border-gray-600 h-20 w-20"></div>
        <div className="animate-spin rounded-full border-t-8 border-gray-600 h-20 w-20 ml-4"></div>
        <div className="animate-spin rounded-full border-t-8 border-gray-600 h-20 w-20 ml-4"></div>
        <div className="animate-spin rounded-full border-t-8 border-gray-600 h-20 w-20 ml-4"></div>
      </div>
    )
  }

  // Calculate the total quantity of items in each order
  const itemQuantities = orderData.map((order: any) => {
    return order.items.reduce((acc: number, item: any) => acc + item.qty, 0)
  })

  let maxSold = 0

  itemQuantities.forEach((item: number) => {
    if (item > maxSold) {
      maxSold = item
    }
  })

  console.log(maxSold)

  const productQuantities: Record<string, any> = {}

  orderData.forEach((order: any) => {
    order.items.forEach((item: any) => {
      const { name, qty, image, price } = item
      productQuantities[name] ??= { qty: 0, image: '' }
      productQuantities[name].qty += qty
      productQuantities[name].image = image
      productQuantities[name].price = price
    })
  })

  console.log(productQuantities)

  const [productName, maxQuantity] = Object.entries(productQuantities).reduce(
    ([prevName, prevData], [name, data]) =>
      data.qty > prevData.qty ? [name, data] : [prevName, prevData],
    ['', { qty: 0 }]
  )

  console.log(productName, maxQuantity.qty, maxQuantity.image)

  // the total products sold
  const TotalQuanity = itemQuantities.reduce((a: any, b: any) => a + b, 0)
  console.log(TotalQuanity)
  return (
    <div>
      <button
        className=" bg-blue-400 text-teal-50 p-4    w-auto rounded-full mt-4 hover:bg-green-600 hover:border-2 hover:border-white "
        onClick={() => router.back()}
      >
        GO BACK TO ADMIN DASHBOARD
      </button>

      <div className="max-w-2xl mx-auto flex flex-col justify-center items-center mb-10 mt-10">
        <div className="bg-white shadow-md rounded-lg max-w-sm">
          <div className="px-5 pb-5">
            <div className="flex items-center justify-between flex-col">
              <h3 className="text-gray-900 font-semibold text-xl tracking-tight">
                Total Product Solds : {TotalQuanity}
              </h3>
              <h3 className="text-gray-900 font-semibold text-xl tracking-tight">
                Most Products Sold in A Order : {maxSold}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto flex flex-col justify-center items-center mb-10 mt-10">
        <div className="bg-white shadow-md rounded-lg max-w-sm">
          <a href="#">
            <img
              className="rounded-t-lg p-8"
              src={maxQuantity.image}
              alt="product image"
              width={600}
              height={400}
            />
          </a>
          <div className="px-5 pb-5">
            <div className="flex items-center justify-between flex-col">
              <h3 className="text-gray-900 font-semibold text-xl tracking-tight">
                The Most Sold Product : {productName}
              </h3>
              <h3 className="text-gray-900 font-semibold text-xl tracking-tight">
                Total Quantity Sold : {maxQuantity.qty}
              </h3>

              <h3 className="text-gray-900 font-semibold text-xl tracking-tight">
                Total Revenue Generated : ${maxQuantity.qty * maxQuantity.price}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products
