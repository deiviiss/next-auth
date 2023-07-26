import mongoose from 'mongoose'

const { MONGODB_URI } = process.env

if (MONGODB_URI == null) {
  throw new Error('MONGOBD_URI most be defined')
}

export const connectionDB = async (): Promise<boolean> => {
  try {
    const { connection } = await mongoose.connect(MONGODB_URI)

    if (connection.readyState === 1) {
      console.log('Db connected')
      return true
    }

    console.log('Db connection failed')
    return false
  } catch (error) {
    console.log('error from Db', error)
    return false
  }
}
