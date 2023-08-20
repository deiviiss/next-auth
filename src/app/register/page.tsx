'use client'
import { type NextPage } from 'next'

import { FormUser } from '@/components/FormUser'

const RegisterPage: NextPage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-[calc(100vh-4rem)]'>
      <FormUser user={undefined}></FormUser>
    </div>
  )
}
export default RegisterPage
