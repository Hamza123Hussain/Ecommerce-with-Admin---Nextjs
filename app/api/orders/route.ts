import { auth } from '@/libs/Auth'
import { calcPrice } from '@/libs/Hooks/UseCartStore'
import MongoConnect from '@/libs/dbconnect'
import OrderModel from '@/libs/models/OrderModel'
import ProductModel from '@/libs/models/ProductModel'
import { NextResponse } from 'next/server'

export const POST = auth(async (req: any) => {
  if (!req.auth) {
    return NextResponse.json(
      {
        message: 'not authorized',
      },
      {
        status: 401,
      }
    )
  }

  const { user } = req.auth

  try {
    const payload = await req.json()
    await MongoConnect()
    const dbProductPrices = await ProductModel.find(
      {
        _id: { $in: payload.items.map((x: { _id: string }) => x._id) },
      },
      'price'
    )
    const dbOrderItems = payload.items.map((x: { _id: string }) => ({
      ...x,
      product: x._id,
      price: dbProductPrices.find((x) => x._id === x._id).price,
      _id: undefined,
    }))

    const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
      calcPrice(dbOrderItems)

    const newOrder = new OrderModel({
      items: dbOrderItems,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      shippingAddress: payload.ShippingDetails,
      paymentMethod: payload.paymentMethod,
      user: user._id,
    })

    const createorder = await newOrder.save()

    return NextResponse.json(
      {
        message: 'ORDER HAS BEEN MADE',
        ORDER: createorder,
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
