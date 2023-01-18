import express from 'express'
import {
  getTodosController,
  insertTodoController,
  updateTodoController,
  deleteTodoController,
  deleteDoneTodoController,
  deleteAllTodoController
} from '../Controllers/controller.js'

const router = express.Router()

router.get('/', getTodosController)

router.post('/', insertTodoController)

router.put('/:id', updateTodoController)

router.delete('/:id', deleteTodoController)

router.delete('/', deleteDoneTodoController)

router.delete('/del/all', deleteAllTodoController)

export default router
