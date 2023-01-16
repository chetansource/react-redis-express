import express from 'express'
import cors from 'cors'
import { connectDataBase } from './Model/database.js'

const app = express()
connectDataBase()

app.use(cors({ methods: ['GET', 'POST', 'DELETE', 'PUT'] }))
app.use(express.json()) //It parses incoming requests with JSON payloads

app.listen(3000, () => {
  console.log('welcome to redis')
})

export default app
