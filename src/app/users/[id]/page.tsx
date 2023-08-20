'use client'
import axios from 'axios'
import { type NextPage } from 'next'
import { useParams } from 'next/navigation'
import { FormUser } from '@/components/FormUser'
import { type UpdateUser } from '@/interfaces/User'

const fetchUser = async (id: number): Promise<UpdateUser> => {
  const data = await axios.get(`http://localhost:3000/api/users/${id}`)
  const user = data.data
  return user
}

const UserEditPage: NextPage = async () => {
  const params = useParams()
  const user = await fetchUser(Number(params.id))

  return (
    <div className='flex flex-col items-center justify-center h-[calc(100vh-4rem)]'>
      <FormUser user={user} ></FormUser>
    </div >
  )
}
export default UserEditPage
