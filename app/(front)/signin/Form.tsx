// Import necessary hooks and components from Next.js and React
'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'

// Define a functional component named Form
const Form = () => {
  // Use the useSession hook from NextAuth to access the user's session information
  const { data: session } = useSession()

  // Use the useSearchParams hook from Next.js to access URL search parameters
  const params = useSearchParams()
  let callbackUrl = params.get('callbackUrl') || '/' // Get the callback URL from search parameters
  const router = useRouter() // Use the useRouter hook from Next.js to access router functionality

  // Define state variables for form data and submission status
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  // Use the useEffect hook to redirect the user if session exists
  useEffect(() => {
    if (session && session.user) {
      router.push(callbackUrl)
    }
  }, [callbackUrl, params, router, session]) // Define dependencies for useEffect

  // Define functions to handle form input changes
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  // Define a function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // Prevent default form submission behavior
    setIsSubmitting(true) // Set form submission status to true

    try {
      await signIn('credentials', { email, password }) // Sign in with credentials
      router.push(callbackUrl) // Redirect to the callback URL after successful sign-in
    } catch (error) {
      console.error('Sign-in failed:', error)
      setIsSubmitting(false) // Set form submission status to false
    }
  }

  // Return JSX representing the sign-in form
  return (
    <div className="max-w-sm mx-auto card bg-base-300 my-4">
      <div className="card-body">
        <h1 className="card-title">Sign in</h1>
        {/* Display error message if present in URL search parameters */}
        {params.get('error') && (
          <div className="alert text-error">
            {params.get('error') === 'CredentialsSignin'
              ? 'Invalid email or password'
              : params.get('error')}
          </div>
        )}
        {/* Display success message if present in URL search parameters */}
        {params.get('success') && (
          <div className="alert text-success">{params.get('success')}</div>
        )}
        {/* Render the sign-in form */}
        <form onSubmit={handleSubmit}>
          {/* Email input field */}
          <div className="my-2">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="input input-bordered w-full max-w-sm"
            />
          </div>
          {/* Password input field */}
          <div className="my-2">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="input input-bordered w-full max-w-sm"
            />
          </div>
          {/* Submit button */}
          <div className="my-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full"
            >
              {/* Display loading spinner if form is submitting */}
              {isSubmitting && (
                <span className="loading loading-spinner"></span>
              )}
              Sign in
            </button>
          </div>
        </form>
        {/* Link to register page */}
        <div>
          Need an account?{' '}
          <Link className="link" href={`/Register?callbackUrl=${callbackUrl}`}>
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}

// Export the Form component as the default export
export default Form
