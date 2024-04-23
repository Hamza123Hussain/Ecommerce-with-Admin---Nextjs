// Import the SessionProvider component from the next-auth/react module
import { SessionProvider } from 'next-auth/react'

// Import the auth function from the custom Auth module
import { auth } from '@/libs/Auth'
import ClientProvider from './ClientProvider'

// Define an asynchronous function named Providers, which accepts children as an argument
export default async function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  // Fetch the user's session information asynchronously using the auth function
  const session = await auth()

  // Return JSX that wraps the application's children components with the SessionProvider
  // The session object retrieved from the auth function is passed as a prop to the SessionProvider
  // This provides session information to the entire application
  return (
    <SessionProvider session={session}>
      <ClientProvider>{children}</ClientProvider>
    </SessionProvider>
  )
}
