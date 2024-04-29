'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const AdminDashBoard = () => {
  // const [OrderData, setdata] = useState([])

  // const GetData = async () => {
  //   try {
  //     const res = await fetch('/api/Admin', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //     const datas = await res.json()

  //     if (res.ok) {
  //       // console.log('data is here : ', datas.Data)
  //       // setdata(datas.Data)
  //     } else {
  //       console.log('no data got')
  //     }
  //   } catch (error: any) {
  //     console.log(error)
  //   }
  // }
  // useEffect(() => {
  //   GetData()
  // }, [])

  // if (OrderData.length > 1) {
  //   console.log(OrderData)
  // }

  return (
    <>
      <div className=" flex flex-col justify-center items-center gap-8 mt-5 mb-5">
        <Link href={'/Admin/AddProduct'}>
          <div className="relative flex  w-72 sm:w-96  flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="relative mx-4 mt-4 h-80 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
              <img
                src="85980904-add-product-vector-icon.jpg"
                alt="Order History"
              />
            </div>
            <div className="p-6 text-center">
              <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                Add A Product
              </h4>
            </div>
          </div>
        </Link>
        <Link href={'/Admin/OrderHistory'}>
          <div className="relative flex w-72 sm:w-96  flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="relative mx-4 mt-4 h-80 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
              <img src="maxresdefault.jpg" alt="Order History" />
            </div>
            <div className="p-6 text-center">
              <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                Order History
              </h4>
            </div>
          </div>
        </Link>
        <Link href={'/Admin/Users'}>
          <div className="relative flex w-72 sm:w-96  flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="relative mx-4 mt-4 h-80 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
              <img
                src="user-details-and-account-icon-concept-vector.jpg"
                alt="Order History"
              />
            </div>
            <div className="p-6 text-center">
              <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                User Details
              </h4>
            </div>
          </div>
        </Link>
        <Link href={'/Admin/Revenue'}>
          <div className="relative flex w-72 sm:w-96  flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="relative mx-4 mt-4 h-80 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
              <img
                src="istockphoto-1304149942-612x612.jpg"
                alt="TOTAL REVENUE"
              />
            </div>
            <div className="p-6 text-center">
              <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                Total Revenue
              </h4>
            </div>
          </div>
        </Link>

        <Link href={'/Admin/Products'}>
          <div className="relative flex w-72 sm:w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="relative mx-4 mt-4 h-80 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
              <img src="Logo-Barra.png" alt="Total Products" />
            </div>
            <div className="p-6 text-center">
              <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                Products Sold
              </h4>
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}
export default AdminDashBoard
