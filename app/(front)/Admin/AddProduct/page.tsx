'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { json } from 'stream/consumers'

const Page = () => {
  const [productdetails, setdetails] = useState({
    pname: '',
    slug: '',
    category: '',
    image: '',
    price: '',
    brand: '',
    stock: '',
    description: '',
    isFeatured: '',
    banner: '',
  })
  const router = useRouter()

  const handlechange = (e: any) => {
    setdetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))

    // console.log(productdetails)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productdetails),
      })

      const data = await response.json()
      if (response.ok) {
        // router.push('/success') // Navigate to a success page if the request is successful
        console.log(data)
        toast.success('data sent')
        router.push('/')
      } else {
        const data = await response.json()
        console.error('Error:', data.message)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }
  return (
    /**name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    isFeatured: { type: Boolean, default: false }, 
    
*/

    <div className=" flex justify-center items-center flex-col">
      <h1 className=" text-7xl text-center m-5 bg-white rounded-full w-fit p-5 text-green-500">
        ADD PRODUCT PAGE
      </h1>

      <form className=" container mx-auto  flex space-y-4 flex-col m-5 w-fit  ">
        <input
          onChange={handlechange}
          name="pname"
          type="text"
          className="rounded-lg p-3 bg-black border-2 border-white text-white"
          placeholder=" Enter Name"
        />
        <input
          onChange={handlechange}
          name="slug"
          type="text"
          className="rounded-lg p-3 bg-black border-2 border-white text-white"
          placeholder="Enter Slug"
        />
        <input
          onChange={handlechange}
          name="image"
          type="text"
          className="rounded-lg p-3 bg-black border-2 border-white text-white"
          placeholder="Enter Image"
        />
        <input
          onChange={handlechange}
          name="banner"
          type="text"
          className="rounded-lg p-3 bg-black border-2 border-white text-white"
          placeholder="Enter Banner"
        />
        <input
          onChange={handlechange}
          name="category"
          type="text"
          className="rounded-lg p-3 bg-black  border-2 border-white text-white"
          placeholder="Enter Category"
        />
        <input
          onChange={handlechange}
          name="price"
          type="number"
          className="rounded-lg p-3 bg-black border-2 border-white text-white"
          placeholder="Enter Price"
        />
        <input
          onChange={handlechange}
          name="brand"
          type="text"
          className="rounded-lg p-3 bg-black border-2 border-white text-white"
          placeholder="Enter Brand"
        />
        <input
          onChange={handlechange}
          name="stock"
          type="text"
          className="rounded-lg p-3 bg-black border-2 border-white text-white"
          placeholder="Enter Number Of Items"
        />{' '}
        <input
          onChange={handlechange}
          name="description"
          type="text"
          className="rounded-lg p-3 bg-black border-2 border-white text-white"
          placeholder="Enter Description"
        />
        <input
          onChange={handlechange}
          name="isFeatured"
          type="text"
          className="rounded-lg p-3 bg-black border-2 border-white text-white"
          placeholder="Should It be Featured?"
        />
        <button
          onClick={handleSubmit}
          className=" bg-green-500 text-white rounded-full p-2 brightness-75 hover:brightness-125"
        >
          {' '}
          Submit Product Details
        </button>
      </form>
    </div>
  )
}

export default Page
