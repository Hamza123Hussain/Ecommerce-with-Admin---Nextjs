// import { createContext, useEffect, useState, ReactNode } from 'react'

// // Define the OrderContext
// interface OrderContextType {
//   OrderData: any[] // Update the type according to your data structure
// }

// export const OrderContext = createContext<OrderContextType>({ OrderData: [] })

// export const OrderDataProvider = ({ children }: { children: ReactNode }) => {
//   const [OrderData, setOrderData] = useState<any[]>([])

//   const GetData = async () => {
//     try {
//       const res = await fetch('/api/Admin', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       })
//       const datas = await res.json()

//       if (res.ok) {
//         setOrderData(datas.Data)
//       } else {
//         console.log('no data got')
//       }
//     } catch (error: any) {
//       console.log(error)
//     }
//   }

//   useEffect(() => {
//     GetData()
//   }, [])

//   // Return the OrderContext.Provider with the value set to OrderData
//   return (
//     <OrderContext.Provider value={OrderData}>{children}</OrderContext.Provider>
//   )
// }
