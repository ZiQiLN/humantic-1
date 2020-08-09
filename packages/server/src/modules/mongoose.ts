import mongoose from 'mongoose'
import signale, { await } from 'signale'

import { MONGODB_URI } from '../utils/env'

const connection = mongoose.connection

connection.on('connected', () => {
  signale.success('mongodb: connection estabilished')
})

connection.on('reconnected', () => {
  signale.log('mongodb: connection reestabilished')
})

connection.on('close', () => {
  signale.info('mongodb: connection closed')
})

connection.on('error', (error: Error) => {
  signale.fatal('mongodb: ERR:' + error)
})

connection.on('disconnected', () => {
  signale.error('mongodb: disconnected')
  signale.info('mongodb: reconnecting...')
  setTimeout(() => {
    mongoose.connect(MONGODB_URI, {
      socketTimeoutMS: 3000,
      connectTimeoutMS: 3000,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  }, 3000)
})

export default async function mongo() {
  await mongoose.connect(MONGODB_URI, {
    socketTimeoutMS: 3000,
    connectTimeoutMS: 3000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}
