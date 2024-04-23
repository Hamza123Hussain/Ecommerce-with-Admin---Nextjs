import MongoConnect from '@/libs/dbconnect'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import UserModel from '@/libs/models/UserModel'

export const POST = async (request: NextRequest) => {
  const { name, email, password } = await request.json()

  await MongoConnect()

  const hashedpassword = await bcrypt.hash(password, 10)

  const newuser = new UserModel({
    name,
    email,
    password: hashedpassword,
  })
  try {
    await newuser.save()
    return NextResponse.json(
      {
        message: 'USER HAS BEEN MADE',
      },
      {
        status: 201,
      }
    )
  } catch (error: any) {
    console.log('user not created')
    console.log(error)
  }
}
