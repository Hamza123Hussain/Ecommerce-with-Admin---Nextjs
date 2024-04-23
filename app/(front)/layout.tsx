import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Ecommerce Store',
  description: 'NEXTJS, SERVER COMPONENTS, NEXT AUTH, DASIY UI, ZUSTAND',
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <main className="  flex-grow container px-4 mx-auto"> {children}</main>
}
