import { auth } from '@/libs/Auth'
import { calcPrice } from '@/libs/Hooks/UseCartStore'
import MongoConnect from '@/libs/dbconnect'
import ProductModel from '@/libs/models/ProductModel'

import { NextResponse } from 'next/server'

export const GET = async (...request: any) => {
  const [req, { params }] = request
  //   if (!req.auth) {
  //     return NextResponse.json(
  //       {
  //         message: 'not authorized',
  //       },
  //       {
  //         status: 401,
  //       }
  //     )
  //   }

  //   const { user } = req.auth

  try {
    await MongoConnect()
    const ProductDeta = await ProductModel.find({ slug: params.id })

    return NextResponse.json(
      {
        ProductDeta,
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
