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
      priority: '',
      deleted: false
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
    const todo = await client.hGet('todos', id)
    const obj = JSON.parse(todo)
    console.log(obj)
    obj.deleted = true
    console.log(obj.deleted)
    await client.hDel('todos', id)
    return await client.hSet('removedTodos', id, JSON.stringify(obj))
  } catch (error) {
    console.log('database error:', error)
    throw Error
  }
}

export async function delDoneTodos() {
  try {
    const data = await client.hGetAll('todos')
    const todos = Object.values(data)
    const completedTask = todos
      .map((obj) => JSON.parse(obj))
      .filter((obj) => obj.checkbox === true)
    const id = completedTask.map((todo) => todo.id)
    completedTask.map(async (todo) => {
      await client.hSet('removedTodos', todo.id, JSON.stringify(todo))
    })
    return await client.hDel('todos', id)
  } catch (error) {
    console.log('database error:', error)
    throw Error
  }
}

export async function delAllTodos() {
  try {
    const data = await client.hGetAll('todos')
    let todos = Object.values(data)
    todos = todos.map((todo) => JSON.parse(todo))
    const id = todos.map((todo) => todo.id)
    todos.map(async (todo) => {
      await client.hSet('removedTodos', todo.id, JSON.stringify(todo))
    })
    return await client.hDel('todos', id)
  } catch (error) {
    console.log('database error:', error)
    throw Error
  }
}
