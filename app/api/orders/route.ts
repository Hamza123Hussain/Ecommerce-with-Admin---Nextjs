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
    /**const dbProductPrices = await ProductModel.find(...):
This line queries a database (presumably MongoDB) using ProductModel.find().
It's searching for documents in the ProductModel collection based on certain criteria.
{ _id: { $in: payload.items.map((x: { _id: string }) => x._id) } }:
This part specifies the query criteria.
It's looking for documents where the _id field matches any of the _id values present in the payload.items array.
$in is a MongoDB operator that selects the documents where the value of a field equals any value in the specified array.
'price':
This is the projection parameter passed to the find() method.
It specifies that only the price field should be returned for the matching documents. */
    const dbOrderItems = payload.items.map((x: { _id: string }) => ({
      ...x,
      product: x._id,
      price: dbProductPrices.find((x) => x._id === x._id).price,
      _id: undefined,
    }))
    /**const dbOrderItems = payload.items.map(...):
This line creates a new array dbOrderItems by mapping over each item in the payload.items array.
({ ...x, product: x._id, price: dbProductPrices.find((x) => x._id === x._id).price, _id: undefined }):
This part of the code is the mapping function applied to each item x.
It spreads the properties of the original item x using the spread operator { ...x }.
It adds a new property product, which is set to the value of x._id.
It retrieves the price of the item from the dbProductPrices array by finding the corresponding document with the same _id.
It sets the _id property to undefined, effectively removing it from the resulting object. */
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
