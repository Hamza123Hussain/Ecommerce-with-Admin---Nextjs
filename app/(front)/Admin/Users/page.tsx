'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Users = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [UserData, setUserData] = useState<any>([])
  const router = useRouter()
  useEffect(() => {
    getData() // Set routerMounted to true when component is mounted
  }, [])

  const getData = async () => {
    try {
      const res = await fetch('/api/Users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()

      if (res.ok) {
        setUserData(data.users)
        setLoading(false)
      } else {
        console.log('No data received')
      }
    } catch (error: any) {
      console.error(error)
      setLoading(false)
    }
  }

  if (UserData.length > 1) {
    console.log(UserData)
  }

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
    <div>
      <button
        className=" bg-blue-400 text-teal-50 p-4    w-auto rounded-full mt-4 hover:bg-green-600 hover:border-2 hover:border-white "
        onClick={() => router.back()}
      >
        GO BACK TO ADMIN DASHBOARD
      </button>
      <div className="flex flex-col mt-5 mb-5">
        <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-white border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      IsAdmin
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Created At
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {UserData.map((element: any) => (
                    <tr key={element._id} className="bg-gray-100 ">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {element._id.substring(0, 10)}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {element.name}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {element.email}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {element.isAdmin ? 'true' : 'false'}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {element.createdAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>{' '}
    </div>
  )
}

export default Users
