'use client'
import Loading from '@/app/Loading'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import useSWR from 'swr'

export default function OrderDetails() {
  // const { data: session } = useSession()
  const params = useParams()

  // console.log(params.id)
  const { data, error } = useSWR(`/api/orders/${params.id}`)

  if (error) return <div>{error.message}</div>
  if (!data)
    return (
      <div>
        <Loading />
      </div>
    )

  const {
    paymentMethod,
    shippingAddress,
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    _id,
  } = data.order[0]

  return (
    <>
      <h1 className=" font-extrabold font mt-5"> Order #{_id}</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-10 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 mt-5 mb-5">
        {/* Order summary */}
        <div className="p-6 bg-white shadow-md rounded-lg dark:bg-gray-800">
          <h2 className="text-gray-800 dark:text-white text-xl font-semibold mb-4">
            Order Summary
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {items.map((product: any) => (
                  <tr key={product._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-10 w-10 rounded-full"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className=" opacity-0">heo</span>
                      {product.qty}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      ${product.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Shipping Details */}
        <div className="p-6 bg-white shadow-md rounded-lg dark:bg-gray-800">
          <h2 className="text-gray-800 dark:text-white text-xl font-semibold mb-4">
            Shipping Details
          </h2>
          <div className="mt-4">
            <p className="text-gray-800 dark:text-white font-medium">
              {shippingAddress.fullName}
            </p>
            <p className="text-gray-800 dark:text-white">
              {shippingAddress.address}, {shippingAddress.city},{' '}
              {shippingAddress.country}
            </p>
          </div>
        </div>

        {/* Payment Method and Total */}
        <div className="p-6 bg-white shadow-md rounded-lg dark:bg-gray-800">
          <h2 className="text-gray-800 dark:text-white text-xl font-semibold mb-4">
            Payment Method
          </h2>
          <p className="text-gray-800 dark:text-white">{paymentMethod}</p>

          <div className="mt-8">
            <p className="text-gray-800 dark:text-white text-lg font-semibold">
              Order Total
            </p>
            <div className="flex justify-between items-center mt-4">
              <p className="text-gray-800 dark:text-white">Items Price:</p>
              <p className="text-gray-800 dark:text-white">${itemsPrice}</p>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-gray-800 dark:text-white">Shipping Fee:</p>
              <p className="text-gray-800 dark:text-white">${shippingPrice}</p>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-gray-800 dark:text-white">Tax:</p>
              <p className="text-gray-800 dark:text-white">${taxPrice}</p>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-gray-800 dark:text-white">Total:</p>
              <p className="text-gray-800 dark:text-white">${totalPrice}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
