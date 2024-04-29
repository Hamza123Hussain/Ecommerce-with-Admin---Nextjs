'use client'
import { CartStore } from '@/libs/Hooks/UseCartStore'
import { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { SWRConfig } from 'swr'

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const updatestore = () => {
    CartStore.persist.rehydrate() // this code will make sure that
    // the cart items are updated even if multiple tabs are opens and the person is adding more items from another tab
  }

  useEffect(() => {
    document.addEventListener('visibilitychange', updatestore)
    window.addEventListener('focus', updatestore)
    return () => {
      document.removeEventListener('visibilitychange', updatestore)
      window.removeEventListener('focus', updatestore)
    }
  }, [])

  return (
    <>
      {/* this is the default config of swr */}
      <SWRConfig
        value={{
          onError: (error, key) => {
            toast.error(error.message)
          },
          fetcher: async (resource, init) => {
            const res = await fetch(resource, init)

            if (!res.ok) {
              throw new Error('AN ERROR OCCURED WHILE FECTHING DATA')
            }
            return res.json()
          },
        }}
      >
        <Toaster />
        {children}
      </SWRConfig>
    </>
  )
}
