'use client'
import { round2 } from '@/libs/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const OrderHistory = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [orderData, setOrderData] = useState<any>([])
  const [routerMounted, setRouterMounted] = useState(false) // State to track if the router is mounted
  const router = useRouter()

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
        console.log(data.Data.totalPrice)
        setOrderData(data.Data)
        setLoading(false)
        console.log(orderData)
      } else {
        console.log('No data received')
      }
    } catch (error: any) {
      console.error(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (routerMounted) {
      // Only execute router-related logic if the router is mounted
      getData()
    }
  }, []) // Run this effect when routerMounted changes

  if (orderData.length > 1) {
    console.log(orderData)
  }

  const TotalMoney = orderData.reduce(
    (acc: any, item: any) => acc + item.totalPrice,
    0
  )

  const TotalTax = orderData.reduce(
    (acc: any, item: any) => acc + item.taxPrice,
    0
  )

  const TotalShippingCost = orderData.reduce(
    (acc: any, item: any) => acc + item.shippingPrice,
    0
  )

  console.log(TotalMoney, TotalShippingCost, TotalTax)
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
  return (
    <>
      <button
        className=" bg-blue-400 text-teal-50 p-2 text-xs sm:text-lg    w-auto rounded-full mt-2 hover:bg-green-600 hover:border-2 hover:border-white "
        onClick={() => router.back()}
      >
        GO BACK TO ADMIN DASHBOARD
      </button>
      <div className="relative mt-5 flex flex-col rounded-xl bg-white shadow-md ml-10 mr-10 mb-5">
        <div className="p-6 bg-blue-500 rounded-t-xl">
          <h1 className="text-2xl font-semibold text-white">Total Revenue</h1>
        </div>
        <div className="p-6 flex flex-col justify-center items-center space-y-4">
          <div className="bg-gray-100 rounded-md p-4 w-full">
            <h2 className="text-lg font-semibold text-gray-700">
              Total Tax Paid:
            </h2>
            <p className="text-xl font-bold text-blue-500">${TotalTax}</p>
          </div>
          <div className="bg-gray-100 rounded-md p-4 w-full">
            <h2 className="text-lg font-semibold text-gray-700">
              Total Shipping Paid:
            </h2>
            <p className="text-xl font-bold text-blue-500">
              ${TotalShippingCost}
            </p>
          </div>
          <div className="bg-gray-100 rounded-md p-4 w-full">
            <h2 className="text-lg font-semibold text-gray-700">
              Total Money Generated:
            </h2>
            <p className="text-xl font-bold text-blue-500">${TotalMoney}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderHistory
