'use client'

import Loading from '@/app/Loading'
import { Order } from '@/libs/models/OrderModel'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import useSWR from 'swr'

export default function MyOrders() {
  const router = useRouter()
  const { data: session } = useSession()
  //SWR MAKES THE CODE CONCISE
  const { data: orders, error } = useSWR(`/api/orders/mine`)
  if (error) return 'An error has occurred.'
  if (!orders) return <Loading />

  console.log(session?.user)

  //CODE DONE BY USING FETCH
  /**  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/orders/mine')
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const data = await response.json()
        setOrders(data)
        setLoading(false)
      } catch (error: any) {
        setError(error)
        setLoading(false)
      }
    }

    fetchData()
  }, []) */

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>Order Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: Order) => (
              <tr key={order._id}>
                <td>{order._id.substring(20, 24)}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>

                <td>
                  <Link href={`/order/${order._id}`} passHref>
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
