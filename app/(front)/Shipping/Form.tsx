'use client'
import useCartService from '@/libs/Hooks/UseCartStore'
import { ShippingAddress } from '@/libs/models/OrderModel'
import { useRouter } from 'next/navigation'

import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const Form = () => {
  const router = useRouter()
  const { SaveShippingDetails } = useCartService()
  const [formValues, setFormValues] = useState<ShippingAddress>({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  })

  // useEffect(() => {
  //   setFormValues(ShippingDetails)
  // }, [ShippingDetails])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (
      formValues.address == '' ||
      formValues.city == '' ||
      formValues.country == '' ||
      formValues.fullName == '' ||
      formValues.postalCode == ''
    ) {
      return toast.error('ALL FIELD ARE REQUIRED TO BE FILLED')
    } else {
      e.preventDefault()
      SaveShippingDetails(formValues)

      router.push('/Payment')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  return (
    <>
      <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-10 mb-10">
        <h1 className="text-xl font-bold text-white capitalize dark:text-white">
          Shipping Details
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                value={formValues.fullName}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="address"
              >
                Address
              </label>
              <input
                id="address"
                type="text"
                name="address"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                value={formValues.address}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200" htmlFor="city">
                City
              </label>
              <input
                id="city"
                type="text"
                name="city"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                value={formValues.city}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="postalCode"
              >
                Postal Code
              </label>
              <input
                id="postalCode"
                type="text"
                name="postalCode"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                value={formValues.postalCode}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="country"
              >
                Country
              </label>
              <input
                id="country"
                type="text"
                name="country"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                value={formValues.country}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Form
