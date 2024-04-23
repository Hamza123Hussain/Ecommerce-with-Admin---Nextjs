import { auth } from '@/libs/Auth'
import MongoConnect from '@/libs/dbconnect'
import OrderModel from '@/libs/models/OrderModel'

export const GET = auth(async (req: any) => {
  if (!req.auth) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      }
    )
  }
  const { user } = req.auth
  await MongoConnect()
  const orders = await OrderModel.find({ user: user._id })
  return Response.json(orders)
}) as any
