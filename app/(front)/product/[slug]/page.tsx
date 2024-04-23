import AddtoCart from '@/Components/Products/AddtoCart'
import data from '@/data'
import productservice from '@/libs/services/productService'
import Link from 'next/link'
import React from 'react'
import { RiStarSFill } from 'react-icons/ri'
import { convertDocToObj } from '@/libs/utils'
import Image from 'next/image'
// generatMetadata is function to modify meta data details
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const product = await productservice.getbyslug(params.slug) // we are getting the product as the param

  if (!product) {
    return { title: 'Product Not Found' }
  }
  return {
    title: product.name, // chnaging title name
    description: product.description, //changing description of the page
  }
}

// the main component for product details is below

const ProductPage = async ({ params }: { params: { slug: string } }) => {
  const product = await productservice.getbyslug(params.slug) // getting the product directly from the database

  if (!product) {
    return <div>NO PRODUCT FOUND</div>
  } else {
    console.log(product)
  }

  return (
    <>
      <Link href={'/'} className="  mt-5 btn btn-info">
        Back to Products
      </Link>

      <div
        className="font-[sans-serif] mt-5 mb-5 border-r-10"
        style={{ borderRadius: '10px' }}
      >
        <div className="p-6 lg:max-w-6xl max-w-2xl mx-auto">
          <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="w-full lg:sticky top-0 sm:flex gap-2">
              <img
                src={`${product.banner}`}
                className="w-full my-6"
                alt={product.slug}
                style={{ width: '400px', height: '400px' }}
              />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-gray-800">
                {product.brand} | {product.name}
              </h2>
              <div className="flex flex-wrap gap-4 mt-4">
                <p className="text-gray-400 text-xl">
                  ${product.price}{' '}
                  <span className="text-sm ml-1">Tax included</span>
                </p>
              </div>
              <div className="flex space-x-2 mt-4">
                {product.rating} <RiStarSFill /> ({product.numReviews})
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-800">
                  About the item
                </h3>
                <h4>{product.description}</h4>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-800">
                  STATUS :{' '}
                  {product.countInStock > 0 ? 'IN STOCK' : 'OUT OF STOCK'}
                </h3>
              </div>
              {product.countInStock !== 0 && ( // only will be shown if item is in stock
                <div className=" card-actions justify-center">
                  <AddtoCart
                    item={convertDocToObj({
                      ...product,
                      qty: 0,
                      color: '',
                      size: '',
                    })}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductPage
