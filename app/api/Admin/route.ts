import { auth } from '@/libs/Auth'
import MongoConnect from '@/libs/dbconnect'
import OrderModel from '@/libs/models/OrderModel'
import { NextResponse } from 'next/server'

export const GET = auth(async (req: any) => {
  const { user } = req.auth
  if (!req.auth) {
    return NextResponse.json({
      Message: 'User not authorized',
    })
  }

  //   console.log(user)

  try {
    await MongoConnect()

    const Data = await OrderModel.find({})

    return NextResponse.json({
      Data,
    })
  } catch (error) {
    console.log(error)
  }
})
