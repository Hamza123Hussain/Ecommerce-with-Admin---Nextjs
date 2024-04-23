import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'

import UserModel from './models/UserModel'
import NextAuth from 'next-auth'
import MongoConnect from './dbconnect'

export const config = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          type: 'email',
        },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        await MongoConnect()
        if (credentials == null) return null

        const user = await UserModel.findOne({ email: credentials.email })

        if (user) {
          const isMatch = await bcrypt.compare(
            credentials.password as string,
            user.password
          )
          if (isMatch) {
            return user
          }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: '/signin',
    newUser: '/register',
    error: '/signin',
  },
  callbacks: {
    // Callback executed on each request to check if the user is authorized to access certain paths
    // authorized({ request, auth }: any) {
    //   // Define an array of paths that require authentication
    //   const protectedPaths = [
    //     /\/Shipping/,
    //     /\/payment/,
    //     /\/place-order/,
    //     /\/profile/,
    //     /\/order\/(.*)/,
    //     /\/admin/,
    //   ]

    //   // Extract the current pathname from the request URL
    //   const { pathname } = request.nextUrl

    //   // Check if the current path matches any of the protected paths
    //   if (protectedPaths.some((path) => path.test(pathname))) {
    //     // Return true if the user is authenticated, otherwise return false
    //     return !!auth
    //   }

    //   // Allow access to non-protected paths
    //   return true
    // },

    // Callback executed when creating or updating a JSON Web Token (JWT)
    async jwt({ user, trigger, session, token }: any) {
      // If a user is authenticated, add their information to the JWT token
      if (user) {
        token.user = {
          _id: user._id,
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin,
        }
      }

      // If the trigger is 'update' and a session exists, update the JWT token with session information
      if (trigger === 'update' && session) {
        token.user = {
          ...token.user,
          email: session.user.email,
          name: session.user.name,
        }
      }

      // Return the updated token
      return token
    },

    // Callback executed to update the session object with token information
    session: async ({ session, token }: any) => {
      // If a token exists, update the session with user information from the token
      if (token) {
        session.user = token.user
      }

      // Return the updated session
      return session
    },
  },
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(config)
