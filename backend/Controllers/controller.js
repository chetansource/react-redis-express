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
    res.status(200).json(todos)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

export const updateTodoController = async (req, res) => {
  try {
    if (isEmpty(req.body)) {
      res.status(400).json({ message: 'invalid request' })
      throw new Error('invalid request')
    }
    const updatedTodo = await alterTodo(
      req.params.id,
      req.body.property,
      req.body.value
    )
    res.json(updatedTodo)
  } catch (error) {
    console.log(error)
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

// export const deleteAllTodoController = async (req, res) => {
//   try {

//     res.sendStatus(200)
//   } catch (error) {
//     console.log(error)
//     res.sendStatus(500)
//   }
// }
