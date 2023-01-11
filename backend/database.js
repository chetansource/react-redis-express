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
    const data = await client.hGetAll('todos')
    const todos = Object.values(data)
    return todos.map((todo) => JSON.parse(todo))
  } catch (error) {
    console.log('db error:', error)
    throw Error
  }
}
export async function insertTodo(todo) {
  try {
    const newTodo = {
      title: todo,
      checkbox: '',
      notes: '',
      dueDate: '',
      priority: ''
    }
    await client.incr('counter')
    const newId = await client.get('counter')
    return await client.hSet('todos', newId, JSON.stringify(newTodo))
  } catch (error) {
    console.log('database error', error)
    throw Error
  }
}

export async function delTodo(id) {
  try {
    return await client.hDel('todos', id)
  } catch (error) {
    console.log('database error', error)
    throw Error
  }
}
