import express from 'express'
import {
  connectDataBase,
  getTodos,
  insertTodo,
  delTodo,
  alterTodo
} from './database.js'

const app = express()
connectDataBase()

app.use(express.json())

app.get('/', async (req, res) => {
  try {
    const todos = await getTodos()
    console.log(todos)
    res.json(todos)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

app.post('/hSet', async (req, res) => {
  try {
    const addTodo = await insertTodo(req.body.title)
    res.json(addTodo)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

app.put('/hSet/:id', async (req, res) => {
  try {
    const updateTodo = await alterTodo(
      req.params.id,
      req.body.property,
      req.body.value
    )
    res.json(updateTodo)
  } catch (error) {
    console.log(error)
  }
})

app.delete('/hDel/:id', async (req, res) => {
  try {
    await delTodo(req.params.id)
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

app.listen(3000, () => {
  console.log('welcome to redis')
})
