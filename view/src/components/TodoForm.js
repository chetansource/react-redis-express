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
import TodoFooter from './TodoFooter'

function TodoForm() {
  const [inputText, setInputText] = useState('')
  const [todos, setTodos] = useState([])
  const [doneTodos, setDoneTodos] = useState('showAll') //use default value instead of empty string

  async function addTodo() {
    if (inputText.trim() === '') return
    await insertTodo(inputText)
    fetchTodos()
    setInputText('')
  }
  async function deleteTodo(id) {
    await removeTodo(id)
    fetchTodos()
  }

  async function updateCheckBox(property, value, id) {
    await updateTodo(property, value, id)
    fetchTodos()
  }

  let timer
  function updateTitle(property, value, id) {
    clearTimeout(timer)
    timer = setTimeout(async () => {
      await updateTodo(property, value, id)
      fetchTodos()
    }, 1000)
  }

  function updateNote(property, value, id) {
    clearTimeout(timer)
    timer = setTimeout(async () => {
      await updateTodo(property, value, id)
      fetchTodos()
    }, 1000)
  }
  // async function updateNote(property, value, id) {
  //   await updateTodo(property, value, id)
  //   fetchTodos()
  // }
  async function updateDueDate(property, value, id) {
    await updateTodo(property, value, id)
    fetchTodos()
  }
  async function updatePriority(property, value, id) {
    await updateTodo(property, value, id)
    fetchTodos()
  }
  async function deleteDone() {
    await removeDone()
    fetchTodos()
  }

  async function deleteAll() {
    await removeAll()
    fetchTodos()
  }

  function showDone() {
    setDoneTodos('showDone')
  }
  async function showAll() {
    setDoneTodos('showAll')
  }
  async function fetchTodos() {
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
        {todos
          .filter((todo) => {
            if (doneTodos === 'showDone') return todo.checkbox
            return true
          })
          .map((todo) => (
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
        <TodoFooter
          onDeleteDone={deleteDone}
          onDeleteAll={deleteAll}
          onShowAll={showAll}
          onShowDone={showDone}
        />
        {/* <footer className='footerButton'>
          <button className='delDone' onClick={deleteDone}>
            Delete Completed
          </button>
          <button className='delAll' onClick={deleteAll}>
            Delete All
          </button>
          <button className='showDone' onClick={showDone}>
            Show Done
          </button>
          <button className='showAll' onClick={showAll}>
            Show All
          </button>
        </footer> */}
      </div>
    </form>
  )
}

export default TodoForm
