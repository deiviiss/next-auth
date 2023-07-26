import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'
import { connectionDB } from '@/libs/mongodb'
import User from '@/models/user'

export async function POST(request: Request): Promise<NextResponse> {
  const { fullname, email, password } = await request.json()

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

  try {
    await connectionDB()

    const userFound = await User.findOne({ email })

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

    const user = new User({
      fullname,
      email,
      password: hashedPassword
    })

    const savedUser = await user.save()

    return NextResponse.json({
      id: savedUser._id,
      fullname: savedUser.fullname,
      email: savedUser.email
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
