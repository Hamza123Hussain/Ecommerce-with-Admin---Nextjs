import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Headers from '@/Components/Header/Headers'
import Providers from '@/Components/Provider'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ecommerce App',
  description: 'Ecommerce App',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className=" min-h-screen flex flex-col">
            <Headers />
            {children}
            <footer className="footer footer-center  bg-base-300  fixed bottom-0 left-0 text-xs w-full">
              <p>Copyright @ 2023 - All Rights Reserved by Shiba Inu</p>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  )
}
