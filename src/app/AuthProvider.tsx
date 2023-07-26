'use client'
import { type NextPage } from 'next'
import { SessionProvider } from 'next-auth/react'

interface Props {
  children: React.ReactNode
}

const AuthProvider: NextPage<Props> = ({ children }: Props) => {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default AuthProvider
