import { createClient } from 'redis'
const redisPort = 6380
const client = createClient(redisPort)

export async function connectDataBase() {
  try {
    client.on('error', (err) => console.log('Redis Client Error', err))
    await client.connect()
    console.log('connected..')
  } catch (error) {
    console.log('Error', error)
  }
}
