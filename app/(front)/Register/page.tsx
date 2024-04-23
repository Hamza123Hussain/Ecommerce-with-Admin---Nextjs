'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'

type Inputs = {
  // THESE THE THE TYPES OF INPUTS
  name: string
  email: string
  password: string
  confirmPassword: string
}

const Form = () => {
  const { data: session } = useSession() // THIS THE SESSION DATA OF THE USER
  const router = useRouter()
  const params = useSearchParams()
  const callbackUrl = params.get('callbackUrl') || '/' // GEETING VALUE FROM THE PARAMS
  const [formValues, setFormValues] = useState<Inputs>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // HANDLING CHANGES MADE TO THE INPUT FIELD
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // THE MAIN FUNCTION RESPONSIBLE FOR THE REGISTERATION OF USERS
    e.preventDefault()
    setIsSubmitting(true)

    if (
      formValues.email === '' ||
      formValues.password === '' ||
      formValues.confirmPassword === '' ||
      formValues.name === ''
    ) {
      toast.error('ALL FIELD ARE REQUIRED TO BE FILLED')
    }

    try {
      const res = await fetch('/api/auth/Register', {
        // FETCHING THE URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues), // SENDING IT THE REQUIRED DATA
      })

      if (res.ok) {
        // IF USER IS REGISTERD SUCCESSFULLY
        router.push(
          `/signin?callbackUrl=${callbackUrl}&success=Account has been created`
        )
      } else {
        const data = await res.json()
        throw new Error(data.message)
      }
    } catch (err: any) {
      err.message && err.message.indexOf('E11000') === 0 // CHECK FOR DUPLICATION OF EMAIL
        ? ''
        : toast.error('Email Already Exists')

      if (formValues.password !== formValues.confirmPassword) {
        // CHECK FOR DUPLICATIN OF PASSWORD
        toast.error('PASSWORDS DO NOT MATCH')
      }
    } finally {
      setIsSubmitting(false)
    }
  }
  useEffect(() => {
    if (session && session.user) {
      // KEEPS ON CHECKING IF THE USER IS LOGGED IN OR NOT
      router.push(callbackUrl) // IF LOGGED IN THEN USER CAN NOT ACCESS THIS PAGE
    }
  }, [callbackUrl, params, router, session])
  return (
    <div className="max-w-sm  mx-auto card bg-base-300 my-4">
      <div className="card-body">
        <h1 className="card-title">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="my-2">
            <label className="label" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="input input-bordered w-full max-w-sm"
              value={formValues.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="my-2">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="input input-bordered w-full max-w-sm"
              value={formValues.email}
              onChange={handleInputChange}
              required
              pattern="[a-z0-9]+@[a-z]+\.[a-z]{2,3}"
            />
          </div>
          <div className="my-2">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="input input-bordered w-full max-w-sm"
              value={formValues.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="my-2">
            <label className="label" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="input input-bordered w-full max-w-sm"
              value={formValues.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="my-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full"
            >
              {isSubmitting && (
                <span className="loading loading-spinner"></span>
              )}
              Register
            </button>
          </div>
        </form>

        <div className="divider"> </div>
        <div>
          Already have an account?{' '}
          <Link className="link" href={`/signin?callbackUrl=${callbackUrl}`}>
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Form
