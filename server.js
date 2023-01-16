import express from 'express'
import cors from 'cors'

const app = express()
 // move it to the database

app.use(cors({ methods: ['GET', 'POST', 'DELETE', 'PUT'] }))
app.use(express.json()) //It parses incoming requests with JSON payloads

app.get('/hGetAll', getTodosController)

app.post('/hSet', insertTodoController)

app.put('/hSet/:id',updateTodoController)

app.delete('/hDel/:id', deleteTodoController)

app.delete('/hDelDone', deleteDoneTodoCOntroller)

app.delete('/hDelAll', deleteAllTodoController)

app.listen(3000, () => {
  console.log('welcome to redis')
})
