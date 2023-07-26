import { Schema, model, models } from 'mongoose'

const userSchema = new Schema({
  fullname: {
    type: String,
    required: [true, 'Name is required'],
    minLength: [3, 'Full name must contain at least 3 characters'],
    maxLength: [50, 'Full name must contain a maximum of 50 characters']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/, 'Invalid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: false
  }
})

// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
const User = models.User || model('User', userSchema)
export default User
