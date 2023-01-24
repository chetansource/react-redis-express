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
  }
}

export async function getTodos() {
  const data = await client.hGetAll('todos')
  const todos = Object.values(data)
  return todos.map((todo) => JSON.parse(todo))
}
export async function insertTodo(todo) {
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
}
export async function alterTodo(id, property, value) {
  const todo = await client.hGet('todos', id)
  const obj = JSON.parse(todo)
  obj[property] = value
  return await client.hSet('todos', id, JSON.stringify(obj))
}

export async function delTodo(id) {
  const todo = await client.hGet('todos', id)
  const obj = JSON.parse(todo)
  console.log(obj)
  obj.deleted = true
  console.log(obj.deleted)
  await client.hDel('todos', id)
  return await client.hSet('removedTodos', id, JSON.stringify(obj))
}

export async function delDoneTodos() {
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
}

export async function delAllTodos() {
  const data = await client.hGetAll('todos')
  let todos = Object.values(data)
  todos = todos.map((todo) => JSON.parse(todo))
  const id = todos.map((todo) => todo.id)
  todos.map(async (todo) => {
    await client.hSet('removedTodos', todo.id, JSON.stringify(todo))
  })
  return await client.hDel('todos', id)
}
