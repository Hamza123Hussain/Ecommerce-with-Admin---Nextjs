'use client'
import React, { useState } from 'react'
import Menu from './Menu'
import { signIn, signOut, useSession } from 'next-auth/react'
import useCartService from '@/libs/Hooks/UseCartStore'
import { useRouter } from 'next/navigation'

const Headers = () => {
  const { init } = useCartService()
  const [search, setSearch] = useState('')
  const router = useRouter()
  const handleSubmit = (e: any) => {
    e.preventDefault()

    router.push(`/product/${search.replace(' ', '').toLowerCase()}`)
    setSearch('')
    console.log('Searching for:', search)
  }

  const handlechange = (e: any) => {
    setSearch(e.target.value)
  }

  const signoutHandler = () => {
    signOut({ callbackUrl: '/signin' }) // use the signout fucntion of next auth.
    init()
  }

  const { data: session } = useSession()
  return (
    <header className="bg-black text-white sticky top-0  border-2 border-b-gray-500 sm:px-2 px-4    z-10">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between w-64 sm:w-full  ">
          <div className="text-white font-bold text-xl mb-2 sm:mb-0 text-center">
            <a href="/">CLOTHS</a>
          </div>

          <div className="flex-1 md:mx-4 my-2 md:my-0">
            <div className="flex items-center  rounded-lg">
              <form
                className="flex items-center justify-center flex-1 gap-2 mb-5  sm:mb-0"
                onSubmit={handleSubmit}
              >
                <div className="  ">
                  <input
                    type="search"
                    className=" w-56 sm:w-96  px-4 py-1 flex-grow text-white rounded-full focus:outline-none"
                    placeholder="Search"
                    value={search}
                    onChange={handlechange}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className={`flex items-center justify-center w-8 sm:w-12 h-8 sm:h-8 border-2 border-green-500  text-white rounded-full ${
                      search.length > 0
                        ? ' opacity-100'
                        : ' opacity-15 cursor-not-allowed'
                    } `}
                    disabled={search.length === 0}
                  >
                    <svg
                      className={`w-5 h-5  bg-clip-text ${
                        search.length > 0
                          ? ' opacity-100'
                          : ' opacity-15 cursor-not-allowed'
                      }"`}
                      fill=""
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="flex items-center">
            <Menu />
            {session && session.user ? (
              <div className="dropdown dropdown-bottom dropdown-end">
                <label tabIndex={0} className="btn btn-ghost rounded-btn">
                  {session.user.name}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </label>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content z-[1]  bg-base-300   w-28 bg-transparent "
                >
                  {session?.user?.name?.toLowerCase() == 'hamza' && (
                    <li className=" bg-green-500">
                      <button
                        type="button"
                        onClick={() => router.push('/Admin')}
                      >
                        <h6 style={{ fontSize: '10px' }}>ADMIN</h6>
                      </button>
                    </li>
                  )}
                  <li className=" bg-white text-gray-600">
                    <button
                      type="button"
                      onClick={() => router.push('/orderhistory')}
                    >
                      <h6 style={{ fontSize: '10px' }}>Order History</h6>
                    </button>
                  </li>
                  <li className=" bg-red-600">
                    <button type="button" onClick={signoutHandler}>
                      <h6 style={{ fontSize: '10px' }}>Sign Out</h6>
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <li>
                <button
                  className="btn btn-ghost rounded-btn"
                  type="button"
                  onClick={() => signIn()}
                >
                  Sign in
                </button>
              </li>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Headers
