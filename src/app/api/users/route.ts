import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'

export async function GET(): Promise<NextResponse> {
  try {
    const users = await prisma.user.findMany()
    return NextResponse.json(users)
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        message: error.message
      })
    }

    return NextResponse.json({
      message: 'Unknown error occurred'
    })
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { name, lastname, user, email, password } = await request.json()

    if (password === null || password.length < 6) {
      return NextResponse.json(
        {
          message: 'Password debe ser mayor a 6 carácteres'
        },
        {
          status: 400
        }
      )
    }

    const userFound = await prisma.user.findFirst({
      where: {
        email
      }
    })

    if (userFound !== null) {
      return NextResponse.json(
        {
          message: 'Email already exist'
        },
        {
          status: 400
        }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        name,
        lastname,
        user,
        email,
        password: hashedPassword
      }
    })

    return NextResponse.json({
      id: newUser.id,
      name: newUser.name,
      lastname: newUser.lastname,
      user: newUser.user,
      email: newUser.email
    })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message
        },
        {
          status: 400
        }
      )
    }

    return NextResponse.json(
      {
        message: 'Unexpected error occurred.'
      },
      {
        status: 500
      }
    )
  }
}
