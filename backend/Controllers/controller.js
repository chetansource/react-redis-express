import {
  getTodos,
  alterTodo,
  insertTodo,
  delTodo,
  delDoneTodos,
  delAllTodos
} from '../Model/database.js'

export const getTodosController = async (req, res) => {
  try {
    const todos = await getTodos()
    res.json(todos)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

export const updateTodoController = async (req, res) => {
  try {
    const updatedTodo = await alterTodo(
      req.params.id,
      req.body.property,
      req.body.value
    )
    res.json(updatedTodo)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

export const insertTodoController = async (req, res) => {
  try {
    const addedTodo = await insertTodo(req.body.title)
    res.json(addedTodo)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

export const deleteTodoController = async (req, res) => {
  try {
    await delTodo(req.params.id)
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

export const deleteDoneTodoController = async (req, res) => {
  try {
    await delDoneTodos()
    res.sendStatus(200)
  } catch (error) {
    console.log('Error:', error)
    res.sendStatus(500)
  }
}

export const deleteAllTodoController = async (req, res) => {
  try {
    await delAllTodos()
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}
