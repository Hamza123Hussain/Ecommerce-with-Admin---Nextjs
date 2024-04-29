'use client'
import Productitem from '@/Components/Products/Productitem'

import { useEffect, useState } from 'react'
import Loading from './Loading'

export default function Home() {
  const [products, setproducts] = useState([])
  const [loading, setloading] = useState(true)
  const getdata = async () => {
    try {
      const response = await fetch(`/api/products`, {
        method: 'GET',
      })

      const data = await response.json()
      console.log(response)

      if (response.ok) {
        setloading(false)
        console.log(data)
        setproducts(data.Products)
      }
    } catch (error: any) {
      console.log(error)
    }
  }
  useEffect(() => {
    getdata()
  }, [])

  if (loading) {
    return <Loading />
  }
  return (
    <>
      <h3 className="py-2">Latest Products</h3>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {products.map((product: any) => (
            <Productitem key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </>
  )
}
