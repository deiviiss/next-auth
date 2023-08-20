'use client'
import { AxiosError } from 'axios'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, type FormEvent, type ChangeEvent } from 'react'
import { useUsers } from '@/context/UserContext'
import { type CreateUser, type UpdateUser } from '@/interfaces/User'

export const FormUser = ({ user }: UpdateUser): JSX.Element => {
  const router = useRouter()
  const [error, setError] = useState()
  const { createUser, updateUser } = useUsers()

  const [formData, setFormData] = useState<CreateUser>({
    name: user?.name || '',
    lastname: user?.lastname || '',
    user: user?.user || '',
    email: user?.email || '',
    password: user?.password || ''
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    if (user === undefined) {
      const formData = new FormData(e.currentTarget)

      try {
        await createUser({
          name: formData.get('name') as string,
          lastname: formData.get('lastname') as string,
          user: formData.get('user') as string,
          email: formData.get('email') as string,
          password: formData.get('password') as string
        })

        const res = await signIn('credentials', {
          email: formData.get('email'),
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

    if (user !== undefined) {
      try {
        delete (formData.password)
        await updateUser(user.id, formData)
        router.push('/users')
      } catch (error) {
        if (error instanceof AxiosError) {
          setError(error.response?.data.message)
        }
      }
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }))
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
          {
            (user !== '') ? 'Update User' : 'Sign Up'
          }
        </h1>

        <input
          type="text"
          placeholder='Name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          className='bg-zinc-800 px-4 py-2 block mb-2 w-full rounded-sm'
        />
        <input
          type="text"
          placeholder='Lastname'
          name='lastname'
          value={formData.lastname}
          onChange={handleChange}
          className='bg-zinc-800 px-4 py-2 block mb-2 w-full rounded-sm'
        />
        <input
          type="text"
          placeholder='User'
          name='user'
          value={formData.user}
          onChange={handleChange}
          className='bg-zinc-800 px-4 py-2 block mb-2 w-full rounded-sm'
        />
        <input
          type="email"
          placeholder='example@mail.com'
          name='email'
          value={formData.email}
          onChange={handleChange}
          className='bg-zinc-800 px-4 py-2 block mb-2 w-full rounded-sm'
        />
        {user === undefined && <input
          type="password"
          name="password"
          placeholder='******'
          value={formData.password}
          onChange={handleChange}
          className='bg-zinc-800 px-4 py-2 block mb-2 w-full rounded-sm'
        />}
        <div className="flex gap-x-3">
          {
            user === undefined
              ? <button type='submit' className='bg-indigo-800 px-4 py-2 rounded-md hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed' disabled={!formData.password | !formData.name | !formData.lastname | !formData.email | !formData.user}>
                Sign Up
              </button>
              : <> <button type='submit' className='bg-indigo-800 px-4 py-2 rounded-md hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed'>
                Update
              </button><button type='button' onClick={() => { router.push('/users') }} className='bg-red-800 px-4 py-2 rounded-md hover:bg-red-600'>Cancel</button></>
          }
        </div>
      </form >
    </div >
  )
}
