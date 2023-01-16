import express from 'express'
import cors from 'cors'

const app = express()
 // move it to the database

app.use(cors({ methods: ['GET', 'POST', 'DELETE', 'PUT'] }))
app.use(express.json()) //It parses incoming requests with JSON payloads



app.listen(3000, () => {
  console.log('welcome to redis')
})
