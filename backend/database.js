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
    console.log('database  error:', error)
    throw Error
  }
}
export async function insertTodo(todo) {
  try {
    await client.incr('counter')
    const newId = await client.get('counter')
    const newTodo = {
      id: newId,
      title: todo,
      checkbox: false,
      notes: '',
      dueDate: '',
      priority: ''
    }
    return await client.hSet('todos', newId, JSON.stringify(newTodo))
  } catch (error) {
    console.log('database error:', error)
    throw Error
  }
}
export async function alterTodo(id, property, value) {
  try {
    const todo = await client.hGet('todos', id)
    const obj = JSON.parse(todo)
    obj[property] = value
    return await client.hSet('todos', id, JSON.stringify(obj))
  } catch (error) {
    console.log('database error:', error)
  }
}

export async function delTodo(id) {
  try {
    console.log(typeof id)
    return await client.hDel('todos', id)
  } catch (error) {
    console.log('database error:', error)
    throw Error
  }
}

export async function delDone() {
  try {
    const todos = await client.hGetAll('todos')
    const objects = Object.values(todos)
    const parsedObj = objects.map((obj) => JSON.parse(obj))
    console.log(parsedObj)
  } catch (error) {
    console.log('database error:', error)
    throw Error
  }
}
