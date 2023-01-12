import express from 'express'
import cors from 'cors'
import {
  connectDataBase,
  getTodos,
  insertTodo,
  delTodo,
  alterTodo,
  delDoneTodos,
  delAllTodos
} from './database.js'

const app = express()
connectDataBase()

app.use(cors({ methods: ['GET', 'POST', 'DELETE', 'PUT'] }))
app.use(express.json())

app.get('/hGetAll', async (req, res) => {
  try {
    const todos = await getTodos()
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

app.delete('/hDelDone', async (req, res) => {
  try {
    await delDoneTodos()
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

app.delete('/hDelAll', async (req, res) => {
  try {
    await delAllTodos()
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

app.listen(3000, () => {
  console.log('welcome to redis')
})
