import { create } from 'zustand'
import { OrderItem, ShippingAddress } from '../models/OrderModel'
import { round2 } from '../utils'
import { persist } from 'zustand/middleware'

type Cart = {
  // data type cart
  items: OrderItem[]
  itemsPrice: number
  taxPrice: number
  shippingPrice: number
  totalPrice: number
  paymentMethod: String
  ShippingDetails: ShippingAddress
}

const intialState: Cart = {
  items: [],
  itemsPrice: 0,
  taxPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
  paymentMethod: 'Cash On Delivery',
  ShippingDetails: {
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  },
}

// // creating a global state cart that manages all the cart data
// // intializeing it with the intial state
export const CartStore = create<Cart>()(
  // persist is a zestland function for storage in local storage
  persist(() => intialState, {
    name: 'cartStore', // name of the item stored in local storage
  })
)

const updateCart = (updatedItems: OrderItem[]) => {
  const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
    calcPrice(updatedItems)
  CartStore.setState({
    items: updatedItems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  })
}
// features of the cart are executed in this function
export default function useCartService() {
  const {
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    ShippingDetails,
    paymentMethod,
  } = CartStore()
  return {
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    ShippingDetails,
    paymentMethod,

    // function executing when an item is added
    increase: (item: OrderItem) => {
      // check for existing item
      const exist = items.find((x) => x.slug === item.slug)
      const updatedCartItems = exist
        ? //if item exits then just incrment its qty
          items.map((x) =>
            x.slug === item.slug ? { ...exist, qty: exist.qty + 1 } : x
          )
        : // else add the item and intialzie qty by 1
          [...items, { ...item, qty: 1 }]

      // the cart state is updated with the new data
      updateCart(updatedCartItems)
    },

    // function to remove item from cart
    decrease: (item: OrderItem) => {
      const exist = items.find((x) => x.slug === item.slug)
      if (!exist) return
      const updatedCartItems =
        // if single item exists then remove from cart
        exist.qty === 1
          ? items.filter((x: OrderItem) => x.slug !== item.slug)
          : // else decrease qty by 1
            items.map((x) =>
              x.slug === item.slug ? { ...exist, qty: exist.qty - 1 } : x
            )

      updateCart(updatedCartItems)
    },
    SaveShippingDetails: (ShippingDetails: ShippingAddress) => {
      CartStore.setState({
        ShippingDetails,
      })
    },
    SavePaymentDetails: (paymentMethod: String) => {
      CartStore.setState({
        paymentMethod,
      })
    },

    /// removing everything from cart
    clear: () => {
      CartStore.setState({
        items: [],
      })
    },
    init: () => CartStore.setState(intialState), // whenever the user logouts all of their details, order history and payments will be removed thorugh this function
    //
  }
}

// function to calculate all costs
export const calcPrice = (items: OrderItem[]) => {
  const itemsPrice = round2(
      items.reduce((acc, item) => acc + item.price * item.qty, 0)
    ),
    shippingPrice = round2(itemsPrice > 100 ? 0 : 100),
    taxPrice = round2(Number(0.15 * itemsPrice)),
    totalPrice = round2(itemsPrice + shippingPrice + taxPrice)
  return { itemsPrice, shippingPrice, taxPrice, totalPrice }
}
