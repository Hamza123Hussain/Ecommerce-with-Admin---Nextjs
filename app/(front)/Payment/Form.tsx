'use client'

import useCartService from '@/libs/Hooks/UseCartStore'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const Form = () => {
  const router = useRouter()
  const { SavePaymentDetails, ShippingDetails } = useCartService()
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const handleSubmit = (e: React.FormEvent) => {
    if (selectedPaymentMethod == '')
      return toast.error('CHOOSE A PAYMENT METHOD')

    e.preventDefault()
    SavePaymentDetails(selectedPaymentMethod)
    router.push('/Placeorder')
  }

  useEffect(() => {
    if (!ShippingDetails.address) {
      return router.push('/Shipping')
    }
  }, [router, ShippingDetails.address])

  return (
    <div>
      <div className="max-w-sm mx-auto card bg-base-300 my-4">
        <div className="card-body">
          <h1 className="card-title">Payment Method</h1>
          <form onSubmit={handleSubmit}>
            {['Cash On Delivery'].map((payment) => (
              <div key={payment}>
                <label className="label cursor-pointer">
                  <span className="label-text">{payment}</span>
                  <input
                    type="radio"
                    name="paymentMethod"
                    className="radio"
                    value={payment}
                    checked={selectedPaymentMethod === payment}
                    onChange={() => setSelectedPaymentMethod(payment)}
                  />
                </label>
              </div>
            ))}
            <div className="my-2">
              <button type="submit" className="btn btn-success w-full">
                Place Order
              </button>
            </div>
            <div className="my-2">
              <button
                type="button"
                className="btn w-full my-2"
                onClick={() => router.back()}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Form
