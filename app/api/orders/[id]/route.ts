import { auth } from '@/libs/Auth'
import MongoConnect from '@/libs/dbconnect'
import OrderModel from '@/libs/models/OrderModel'
import { NextResponse } from 'next/server'

export const GET = auth(async (...request: any) => {
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
    const order = await OrderModel.find({ _id: params.id })

    return NextResponse.json({ order })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      {
        status: 500,
      }
    )
  }
})
