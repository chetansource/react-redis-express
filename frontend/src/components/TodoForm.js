import { useEffect, useState } from 'react'
import React from 'react'
import './TodoForm.css'
import TodoItem from './TodoItem.js'
import {
  getTodos,
  insertTodo,
  removeTodo,
  updateTodo,
  removeDone,
  removeAll
} from './FetchRequest.js'

function TodoForm() {
  const [inputText, setInputText] = useState('')
  const [todos, setTodos] = useState([])

  async function addTodo() {
    if (inputText.trim() === '') return
    await insertTodo(inputText)
    setTodos(await getTodos())
    setInputText('')
  }
  async function deleteTodo(id) {
    await removeTodo(id)
    setTodos(await getTodos())
  }

  async function updateCheckBox(property, value, id) {
    await updateTodo(property, value, id)
    setTodos(await getTodos())
  }
  async function updateTitle(property, value, id) {
    await updateTodo(property, value, id)
    setTodos(await getTodos())
  }
  async function updateNote(property, value, id) {
    await updateTodo(property, value, id)
    setTodos(await getTodos())
  }
  async function updateDueDate(property, value, id) {
    await updateTodo(property, value, id)
    setTodos(await getTodos())
  }
  async function updatePriority(property, value, id) {
    await updateTodo(property, value, id)
    setTodos(await getTodos())
  }
  async function deleteDone() {
    await removeDone()
    setTodos(await getTodos())
  }

  async function deleteAll() {
    await removeAll()
  }

  // const allTodos = todos
  function showDone() {
    const filteredTodos = todos.filter((todo) => todo.checkbox === true)
    setTodos(filteredTodos)
  }
  async function showAll() {
    setTodos(await getTodos())
  }

  //useEffect hook
  useEffect(() => {
    getTodos().then((todos) => {
      setTodos(todos)
    })
  }, [])

  return (
    <form className='todoForm' onSubmit={(e) => e.preventDefault()}>
      <div className='form'>
        <input
          className='title'
          type='text'
          name='inputText'
          placeholder='what do you want to achieve...?'
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
        />
        <button className='submitBtn' onClick={addTodo}>
          ADD TASK
        </button>
      </div>
      <div>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={deleteTodo}
            onCheckboxUpdate={updateCheckBox}
            onUpdateTitle={updateTitle}
            onUpdateNote={updateNote}
            onUpdateDueDate={updateDueDate}
            onUpdatePriority={updatePriority}
          />
        ))}
      </div>
      <div>
        <footer className='footerButton'>
          <button className='delDone' onClick={() => deleteDone()}>
            Delete Completed
          </button>
          <button className='delAll' onClick={() => deleteAll()}>
            Delete All
          </button>
          <button
            className='showDone'
            onClick={() => {
              showDone()
            }}
          >
            Show Done
          </button>
          <button className='showAll' onClick={() => showAll()}>
            Show All
          </button>
        </footer>
      </div>
    </form>
  )
}

export default TodoForm
