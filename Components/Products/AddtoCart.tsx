'use client'

import UsecartService from '@/libs/Hooks/UseCartStore'
import { OrderItem } from '@/libs/models/OrderModel'

import { useEffect, useState } from 'react'

export default function AddtoCart({ item }: { item: OrderItem }) {
  const { items, increase, decrease } = UsecartService() // data taken from the main cart function

  const [itemexist, setexistitem] = useState<OrderItem | undefined>() // no item then it is undefiened

  useEffect(() => {
    setexistitem(items.find((x) => x.slug == item.slug)) // checks for exisiting item everytime  decrease or increase function executed
  }, [item, items])

  const addtocart = () => {
    increase(item)
  }

  return itemexist ? (
    <div>
      <button
        className=" btn "
        type="button"
        onClick={() => decrease(itemexist)}
      >
        -
      </button>

      <span className=" px-2">{itemexist.qty}</span>

      <button
        className=" btn"
        type="button"
        onClick={() => increase(itemexist)}
      >
        +
      </button>
    </div>
  ) : (
    // the below code will be shown when item is completely removed from the cart
    <button
      className=" btn btn-primary w-full"
      type="button"
      onClick={addtocart}
    >
      Add to Cart
    </button>
  )
}
