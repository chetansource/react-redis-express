import {
  getTodos,
  alterTodo,
  insertTodo,
  delTodo,
  delDoneTodos,
  delAllTodos
} from '../Model/database.js'
import isEmpty from '../utility.js'

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
    if (isEmpty(req.body)) {
      res.status(400).json({ message: 'invalid request' }) //terminate here since it flow passes
    }
    const updatedTodo = await alterTodo(
      req.params.id,
      req.body.property,
      req.body.value
    )
    res.json(updatedTodo)
  } catch (error) {
    console.log(error) //test it
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
    await delTodo(req.params.id) // send error code 404 if the id doesnt exist
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

export const deleteTodosController = async (req, res) => {
  try {
    if (req.query.checkbox === 'true') {
      await delDoneTodos()
    }
    if (req.query.checkbox === 'false') {
      await delAllTodos()
    }
    res.sendStatus(200)
  } catch (error) {
    console.log('Error:', error)
    res.sendStatus(500)
  }
}
