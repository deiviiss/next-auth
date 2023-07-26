'use client'
import axios, { AxiosError } from 'axios'
import { type NextPage } from 'next'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'

const RegisterPage: NextPage = () => {
  const [error, setError] = useState()
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    try {
      const signupResponse = await axios.post('api/auth/signup', {
        fullname: formData.get('fullname'),
        email: formData.get('email'),
        password: formData.get('password')
      })

      const res = await signIn('credentials', {
        email: signupResponse.data.email,
        password: formData.get('password'),
        redirect: false
      })

      if ((res?.ok) ?? false) {
        router.push('/home')
        router.refresh()
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message)
      }
    }
  }

  return (
    <div className='flex flex-col items-center justify-center h-[calc(100vh-4rem)]'>
      {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        error && <div className='bg-red-500 text-white p-2 mb-2 rounded'>{error}</div>
      }
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit} className=' bg-neutral-950 flex flex-col justify-center items-center mx-2 px-8 py-10 gap-y-4 rounded'>

        <h1 className=' text-2xl font-bold mb-4'>
          Sign Up
        </h1>

        <input
          type="text"
          placeholder='Name'
          name='fullname'
          className='bg-zinc-800 px-4 py-2 block mb-2 w-full rounded-sm'
        />
        <input
          type="email"
          placeholder='example@mail.com'
          name='email'
          className='bg-zinc-800 px-4 py-2 block mb-2 w-full rounded-sm'
        />
        <input
          type="password"
          name="password"
          placeholder='******'
          className='bg-zinc-800 px-4 py-2 block mb-2 w-full rounded-sm'
        />
        <button className='bg-indigo-800 px-4 py-2 rounded-md hover:bg-indigo-600'>Sign Up</button>
      </form>
    </div>
  )
}
export default RegisterPage
