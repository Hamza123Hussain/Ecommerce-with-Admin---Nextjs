// import data from '@/data'
// import MongoConnect from '@/libs/dbconnect'
// import ProductModel from '@/libs/models/ProductModel'
// import UserModel from '@/libs/models/UserModel'
// import { NextRequest, NextResponse } from 'next/server'

// export const GET = async (request: NextRequest) => {
//   const { users, products } = data

//   await MongoConnect()

//   await UserModel.deleteMany()

//   await UserModel.insertMany(users)

//   await ProductModel.deleteMany()

//   await ProductModel.insertMany(products)

//   return NextResponse.json({
//     message: 'SEEDED SUCCESS',
//     users,
//     products,
//   })
// }
