'use client'
import { type NextPage } from 'next'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'

const LoginPage: NextPage = () => {
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const res = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false
    })

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-confusing-void-expression
    // if (res?.error) return setError(res.error) as unknown as string
    if ((res?.error) != null) {
      setError(res.error)

      return
    }

    if ((res?.ok) ?? false) {
      router.push('/profile')
      router.refresh()
    }
  }

  return (
    <div className='flex flex-col items-center justify-center h-[calc(100vh-4rem)]'>
      {
        (error.length > 0) && <div className='bg-red-500 text-white p-2 mb-2 rounded'>{error}</div>
      }
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit} className=' bg-neutral-950 flex flex-col justify-center items-center mx-2 px-8 py-10 gap-y-4 rounded'>

        <h1 className='text-center text-2xl font-bold mb-4'>
          Sign In
        </h1>

        <input
          type="email"
          placeholder='hello@mail.com'
          name='email'
          className='bg-zinc-800 px-4 py-2 block mb-2 w-full rounded-sm'
        />
        <input
          type="password"
          name="password"
          placeholder='******'
          className='bg-zinc-800 px-4 py-2 block mb-2 w-full rounded-sm'
        />
        <button className='bg-indigo-800 px-4 py-2 rounded-sm hover:bg-indigo-600'>Sign In</button>
      </form>
    </div>
  )
}
export default LoginPage
