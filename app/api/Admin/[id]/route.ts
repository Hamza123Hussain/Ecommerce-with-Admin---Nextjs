import { auth } from '@/libs/Auth'
import MongoConnect from '@/libs/dbconnect'

import ProductModel from '@/libs/models/ProductModel'
import { NextResponse } from 'next/server'

export const DELETE = auth(async (...request: any) => {
  const [req, { params }] = request
  try {
    if (!req.auth) {
      return NextResponse.json(
        { message: 'unauthorized' },
        {
          status: 401,
        }
      )
    }
    await MongoConnect()
    const product = await ProductModel.findOneAndDelete({ slug: params.id })

    if (!product) {
      return NextResponse.json({ messge: 'product not found' })
    }

    return NextResponse.json({ message: 'item deleted' })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: error },
      {
        status: 500,
      }
    )
  }
})

export const PUT = auth(async (...request: any) => {
  const [req, { params }] = request
  try {
    if (!req.auth) {
      return NextResponse.json({ message: 'unauthorized' }, { status: 401 })
    }
    await MongoConnect()
    const payload = await req.json()
    const product = await ProductModel.findOneAndUpdate(
      { slug: params.id },
      payload, // Update object
      { new: true } // Return the updated document
    )

    if (!product) {
      return NextResponse.json({ message: 'product not found' })
    }

    return NextResponse.json({ message: 'item updated', product })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
})
