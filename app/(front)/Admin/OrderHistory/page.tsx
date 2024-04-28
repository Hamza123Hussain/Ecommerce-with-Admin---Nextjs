'use client'
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

  return (
    <>
      <button
        className=" bg-blue-400 text-teal-50 p-2 text-xs sm:text-lg    w-auto rounded-full mt-2 hover:bg-green-600 hover:border-2 hover:border-white "
        onClick={() => router.back()}
      >
        GO BACK TO ADMIN DASHBOARD
      </button>
      <section className="antialiased bg-transparent text-gray-600 h-screen px-4 mt-10 mb-10">
        <div className="flex flex-col justify-center h-full">
          <div className="w-full max-w-2xl mx-auto bg-transparent shadow-lg rounded-sm border border-gray-200 overflow-x-auto">
            <div className="p-3">
              <table className="table-auto w-full whitespace-nowrap">
                <thead className="text-xs font-semibold uppercase text-gray-400 bg-transparent">
                  <tr>
                    <th className="p-2">
                      <div className="font-semibold text-left">Order ID</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-left">Name</div>
                    </th>

                    <th className="p-2">
                      <div className="font-semibold text-left">Spent</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">Country</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">
                        Created At
                      </div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">
                        Complete Details
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  {orderData.map((order: any) => (
                    <tr key={order._id}>
                      <td className="p-2">{order._id.substring(0, 6)}...</td>
                      <td className="p-2">{order.shippingAddress.fullName}</td>

                      <td className="p-2 font-medium text-green-500">
                        ${order.totalPrice}
                      </td>
                      <td className="p-2 text-center">
                        {order.shippingAddress.country}
                      </td>
                      <td className="p-2 text-center">
                        {order.createdAt.substring(0, 10)}
                      </td>

                      <td className="p-2 text-center ">
                        <h3 onClick={() => router.push(`/order/${order._id}`)}>
                          {' '}
                          Details{' '}
                        </h3>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default OrderHistory
