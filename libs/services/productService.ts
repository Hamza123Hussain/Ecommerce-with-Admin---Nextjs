import { cache } from 'react'
import MongoConnect from '../dbconnect'
import ProductModel, { Product } from '../models/ProductModel'

const getLatest = cache(async () => {
  await MongoConnect()
  const products = await ProductModel.find({}).sort({ _id: 1 }).lean() // getting all the products in a sorted format
  // only 4 products becuase of the limit
  return products as Product[]
})

const getFeatured = cache(async () => {
  await MongoConnect()
  // getting some featured products for slider
  const products = await ProductModel.find({ isFeatured: true }).limit(3).lean()
  return products as Product[]
})

const getbyslug = cache(async (slug: string) => {
  //cache is likely a custom caching mechanism applied to the getbyslug function,
  await MongoConnect()
  // getting products via query in search bar
  const product = await ProductModel.findOne({
    slug,
  }).lean()
  //lean() is a method provided by Mongoose to optimize performance by returning plain JavaScript objects instead of Mongoose documents.
  return product as Product
})

const productservice = {
  getLatest,
  getFeatured,
  getbyslug,
}

export default productservice
