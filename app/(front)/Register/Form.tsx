'use client'
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

type Inputs = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const Form = () => {
  const { data: session } = useSession()

  const router = useRouter()

  const [formValues, setFormValues] = useState<Inputs>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<Partial<Inputs>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      })

      if (res.ok) {
        router.push(`/`)
      } else {
        const data = await res.json()
        throw new Error(data.message)
      }
    } catch (err: any) {
      const error =
        err.message && err.message.indexOf('E11000') === 0
          ? 'Email is duplicate'
          : err.message
      toast.error(error || 'Error')
      setErrors({ ...errors, ...error })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (session) {
    return null
  }
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
            {errors.name && <div className="text-error">{errors.name}</div>}
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
            {errors.email && <div className="text-error">{errors.email}</div>}
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
            {errors.password && (
              <div className="text-error">{errors.password}</div>
            )}
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
            {errors.confirmPassword && (
              <div className="text-error">{errors.confirmPassword}</div>
            )}
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
          <Link className="link" href={`/signin`}>
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Form
