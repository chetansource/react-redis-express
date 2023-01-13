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
connectDataBase() // move it to the database

app.use(cors({ methods: ['GET', 'POST', 'DELETE', 'PUT'] }))
app.use(express.json()) //It parses incoming requests with JSON payloads

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
    const addedTodo = await insertTodo(req.body.title)
    res.json(addedTodo)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

app.put('/hSet/:id', async (req, res) => {
  try {
    const updatedTodo = await alterTodo(
      req.params.id,
      req.body.property,
      req.body.value
    )
    res.json(updatedTodo)
  } catch (error) {
    console.log(error)
    res.sendStatus(304) //It tells the client that the response has not been modified
  }
})

app.delete('/hDel/:id', async (req, res) => {
  try {
    await delTodo(req.params.id)
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.sendStatus(501) //change it the statuscode
  }
})

app.delete('/hDelDone', async (req, res) => {
  try {
    await delDoneTodos()
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.sendStatus(501)
  }
})

app.delete('/hDelAll', async (req, res) => {
  try {
    await delAllTodos()
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.sendStatus(501) //NOT Implemented
  }
})

app.listen(3000, () => {
  console.log('welcome to redis')
})
