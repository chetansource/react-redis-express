import { createClient } from 'redis'
const client = createClient({
  url: 'redis://@localhost:6380'
})

export async function connectDataBase() {
  try {
    await client.connect()
    console.log(' Redis Client connected..')
  } catch (error) {
    console.log('Redis Client Error', error)
    throw Error
  }
}

export async function getTodos() {
  try {
    const data = await client.hGet('name')
    return data
  } catch (error) {
    console.log('database error', error)
    throw Error
  }
}

// console.log(await getTodos())
