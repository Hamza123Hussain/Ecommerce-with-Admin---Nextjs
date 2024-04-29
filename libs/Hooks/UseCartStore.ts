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
// This function is defined to create a custom hook called useCartService
export default function useCartService() {
  // Destructuring values from the CartStore hook
  const {
    items, // Array of items in the cart
    itemsPrice, // Total price of items
    taxPrice, // Total tax price
    shippingPrice, // Shipping price
    totalPrice, // Total price including tax and shipping
    ShippingDetails, // Details of the shipping address
    paymentMethod, // Chosen payment method
  } = CartStore()

  // Returning an object containing all the above destructured values and additional functions for manipulating the cart state
  return {
    items, // Array of items in the cart
    itemsPrice, // Total price of items
    taxPrice, // Total tax price
    shippingPrice, // Shipping price
    totalPrice, // Total price including tax and shipping
    ShippingDetails, // Details of the shipping address
    paymentMethod, // Chosen payment method

    // Function executed when an item is added to the cart
    increase: (item: OrderItem) => {
      // Check if the item already exists in the cart
      const exist = items.find((x) => x.slug === item.slug)
      // Update cart items based on whether the item exists or not
      const updatedCartItems = exist
        ? // If item exists, increment its quantity
          items.map((x) =>
            x.slug === item.slug ? { ...exist, qty: exist.qty + 1 } : x
          )
        : // If item does not exist, add it to the cart with quantity initialized to 1
          [...items, { ...item, qty: 1 }]

      // Update the cart state with the new data
      updateCart(updatedCartItems)
    },

    // Function to decrease the quantity of an item in the cart
    decrease: (item: OrderItem) => {
      // Check if the item exists in the cart
      const exist = items.find((x) => x.slug === item.slug)
      // If item does not exist, return
      if (!exist) return
      // Update cart items based on the quantity of the existing item
      const updatedCartItems =
        // If the quantity of the existing item is 1, remove it from the cart
        exist.qty === 1
          ? items.filter((x: OrderItem) => x.slug !== item.slug)
          : // If the quantity of the existing item is greater than 1, decrease its quantity by 1
            items.map((x) =>
              x.slug === item.slug ? { ...exist, qty: exist.qty - 1 } : x
            )

      // Update the cart state with the new data
      updateCart(updatedCartItems)
    },

    // Function to save shipping details to the cart state
    SaveShippingDetails: (ShippingDetails: ShippingAddress) => {
      // Update the cart state with the provided shipping details
      CartStore.setState({
        ShippingDetails,
      })
    },

    // Function to save payment details to the cart state
    SavePaymentDetails: (paymentMethod: String) => {
      // Update the cart state with the provided payment method
      CartStore.setState({
        paymentMethod,
      })
    },

    // Function to clear all items from the cart
    clear: () => {
      // Update the cart state with an empty array of items
      CartStore.setState({
        items: [],
      })
    },

    // Function to initialize the cart state
    init: () => CartStore.setState(intialState), // Whenever the user logs out, their details, order history, and payments will be removed through this function
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
