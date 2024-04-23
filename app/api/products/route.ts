import { auth } from '@/libs/Auth'
import { calcPrice } from '@/libs/Hooks/UseCartStore'
import MongoConnect from '@/libs/dbconnect'
import ProductModel from '@/libs/models/ProductModel'

import { NextResponse } from 'next/server'

export const POST = auth(async (req: any) => {
  try {
    const payload = await req.json()
    await MongoConnect()

    const newproduct = new ProductModel({
      name: payload.pname,
      slug: payload.slug,
      category: payload.category,
      image: payload.image,
      price: payload.price,
      brand: payload.brand,
      banner: payload.banner,
      rating: 0,
      numReviews: 0,
      countInStock: payload.stock,
      description: payload.description,
      isFeatured: false,
    })

    await newproduct.save()
    return NextResponse.json(
      {
        message: 'ORDER HAS BEEN MADE',
        ProductDetails: newproduct,
      },
      {
        status: 201,
      }
    )
  } catch (error: any) {
    return Response.json(
      { message: error.message },
      {
        status: 500,
      }
    )
  }
})

export const GET = async (req: any) => {
  try {
    await MongoConnect()
    const Products = await ProductModel.find({})

    return NextResponse.json(
      {
        Products,
      },
      {
        status: 201,
      }
    )
  } catch (error: any) {
    return Response.json(
      { message: error.message },
      {
        status: 500,
      }
    )
  }
}
