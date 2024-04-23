'use client'
import useCartService from '@/libs/Hooks/UseCartStore'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import useSWRMutation from 'swr/mutation'

const Form = () => {
  const {
    paymentMethod,
    ShippingDetails,
    shippingPrice,
    taxPrice,
    items,
    itemsPrice,
    totalPrice,
    clear,
  } = useCartService()

  const router = useRouter()

  // SWR MUTATION TAKES A TRIGGER FUNCTION AND IS MUTATION. IT TAKES A URL TO MUTATE
  // AND A ASYNC FUNCTION THROUGH WHICH IT MUTATES ON THE URL
  // SWR HELPS IN SHORTING THE CODE AND OPTIMZIING
  const { trigger: placeOrder, isMutating: isPlacing } = useSWRMutation(
    `/api/orders/mine`,
    async () => {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethod,
          ShippingDetails,
          items,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        }),
      })
      const data = await res.json()
      console.log('data is here : ', data)
      if (res.ok) {
        clear()
        toast.success('Order placed successfully')
        router.push(`/order/${data.ORDER._id}`)
      } else {
        toast.error(data.message)
      }
    }
  )

  // THIS IS THE SIMPLE CODE USING FETCH AND NOT SWR MUTATION
  /**
  const placeOrder = async () => {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethod,
          ShippingDetails,
          items,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        }),
      })

      const data = await res.json()
      console.log('data is here : ', data)

      if (res.ok) {
        clear()
        toast.success('Order placed successfully')
        router.push(`/order/${data.ORDER._id}`)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error('An error occurred while placing the order:', error)
      toast.error(
        'An error occurred while placing the order. Please try again.'
      )
    }
  }

  const isPlacing = false // Placeholder for isPlacing state, since it's not directly provided by fetch
 */
  useEffect(() => {
    if (!paymentMethod) {
      return router.push('/payment')
    }
    if (items.length === 0) {
      return router.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethod, router])
  return (
    <div className="grid md:grid-cols-4 md:gap-5 my-4">
      <div className="overflow-x-auto md:col-span-3">
        <div className="card bg-base-300">
          <div className="card-body">
            <h2 className="card-title">Shipping Address</h2>
            <p>{ShippingDetails.fullName}</p>
            <p>
              {ShippingDetails.address}, {ShippingDetails.city},{' '}
              {ShippingDetails.postalCode}, {ShippingDetails.country}{' '}
            </p>
            <div>
              <Link className="btn" href="/Shipping">
                Edit
              </Link>
            </div>
          </div>
        </div>

        <div className="card bg-base-300 mt-4">
          <div className="card-body">
            <h2 className="card-title">Payment Method</h2>
            <p>{paymentMethod}</p>
            <div>
              <Link className="btn" href="/payment">
                Edit
              </Link>
            </div>
          </div>
        </div>

        <div className="card bg-base-300 mt-4">
          <div className="card-body">
            <h2 className="card-title">Items</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.slug}>
                    <td>
                      <Link
                        href={`/product/${item.slug}`}
                        className="flex items-center"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                        />
                        <span className="px-2">
                          {item.name}({item.color} {item.size})
                        </span>
                      </Link>
                    </td>
                    <td>
                      <span>{item.qty}</span>
                    </td>
                    <td>${item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <Link className="btn" href="/cart">
                Edit
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className=" mt-10">
        <div className="card bg-base-300">
          <div className="card-body">
            <h2 className="card-title">Order Summary</h2>
            <ul className="space-y-3">
              <li>
                <div className=" flex justify-between">
                  <div>Items</div>
                  <div>${itemsPrice}</div>
                </div>
              </li>
              <li>
                <div className=" flex justify-between">
                  <div>Tax</div>
                  <div>${taxPrice}</div>
                </div>
              </li>
              <li>
                <div className=" flex justify-between">
                  <div>Shipping</div>
                  <div>${shippingPrice}</div>
                </div>
              </li>
              <li>
                <div className=" flex justify-between">
                  <div>Total</div>
                  <div>${totalPrice}</div>
                </div>
              </li>

              <li>
                <button
                  onClick={() => placeOrder()}
                  disabled={isPlacing}
                  className="btn btn-primary w-full"
                >
                  {isPlacing && (
                    <span className="loading loading-spinner"></span>
                  )}
                  Place Order
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Form
