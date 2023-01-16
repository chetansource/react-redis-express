import app from '../server.js'

app.get('/hGetAll', getTodosController)

app.post('/hSet', insertTodoController)

app.put('/hSet/:id',updateTodoController)

app.delete('/hDel/:id', deleteTodoController)

app.delete('/hDelDone', deleteDoneTodoCOntroller)

app.delete('/hDelAll', deleteAllTodoController)