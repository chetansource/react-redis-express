import express from 'express'
import {
  getTodosController,
  insertTodoController,
  updateTodoController,
  deleteTodoController,
  deleteDoneTodoCOntroller,
  deleteAllTodoController
} from '../Controllers/controller.js'

const router = express.Router()

router.get('/', getTodosController) //change it to all small case, remove  todo in path

router.post('/', insertTodoController)

router.put('/:id', updateTodoController)

router.delete('/:id', deleteTodoController)

router.delete('/TodosDone', deleteDoneTodoCOntroller) //implement soft delete

router.delete('/TodosAll', deleteAllTodoController)

export default router
