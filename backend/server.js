import express from 'express'
import { connectDataBase, getTodos, insertTodo, delTodo } from './database.js'

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
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

app.delete('/hDel/id', async (req, res) => {
  try {
    await delTodo(req.params.id)
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

app.listen(3000, () => {
  console.log('welcome to redis')
})
