'use client'
import Loading from '@/app/Loading'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const ProductPage = ({ params }: { params: { slug: string } }) => {
  const router = useRouter()
  const [loading, setloading] = useState(true)
  const [productdetails, setDetails] = useState({
    name: '',
    banner: '',
    image: '',
    price: 0,
    countInStock: 0,
    description: '',
    slug: '',
    brand: '',
    category: '',
  })

  const deletedata = async () => {
    try {
      const response = await fetch(`/api/Admin/${params.slug}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete product')
      }
      const data = await response.json()
      toast.success('PRODUCT HAS BEEN DELETED')
      console.log(data)

      router.push('/')
    } catch (error) {
      console.error(error)
      // Handle error
    }
  }

  const UPDATE = async (e: any) => {
    e.preventDefault()

    try {
      const response = await fetch(`/api/Admin/${params.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productdetails),
      })

      const data = await response.json()
      if (response.ok) {
        // router.push('/success') // Navigate to a success page if the request is successful
        console.log(data)
        toast.success('data updated')
        router.push('/')
        // router.push('/')
      } else {
        const data = await response.json()
        console.error('Error:', data.message)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }))
  }

  const getData = async () => {
    try {
      const res = await fetch(`/api/products/${params.slug}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()

      if (res.ok) {
        setDetails(data.ProductDeta[0])
      } else {
        console.log('No data received')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  if (loading) {
    return <Loading />
  }
  return (
    <div className="container mx-auto mt-8">
      <Link href={'/'} className="btn btn-info mb-8">
        Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(productdetails).map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <label htmlFor={key} className="text-gray-600 mb-2">
              {key.charAt(0).toUpperCase() + key.slice(1)}:
            </label>
            <input
              id={key}
              name={key}
              type="text"
              value={value}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              onChange={handleChange}
            />
          </div>
        ))}
      </div>
      <div className=" flex gap-3 justify-center items-center m-5 ">
        {' '}
        <button onClick={deletedata} className=" bg-red-700 rounded-lg p-2">
          Delete
        </button>
        <button onClick={UPDATE} className=" bg-blue-600 rounded-lg p-2">
          Update
        </button>
      </div>
    </div>
  )
}

export default ProductPage
