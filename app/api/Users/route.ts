import { auth } from '@/libs/Auth'
import MongoConnect from '@/libs/dbconnect'
import UserModel from '@/libs/models/UserModel'
import { NextResponse } from 'next/server'

export const GET = auth(async (req: any) => {
  if (!req.auth) {
    return NextResponse.json({
      Message: 'User not authorized',
    })
  }

  try {
    await MongoConnect()

    const users = await UserModel.find({})

    return NextResponse.json({
      users,
    })
  } catch (error: any) {
    console.log(error)
  }
})
