import { useState } from 'react'
import React from 'react'
import './TodoForm.css'
import TodoItem from './TodoItem.js'

function TodoForm() {
  const [inputText, setInputText] = useState('')
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('items')) || []
  )
  const fetchTodos = JSON.parse(localStorage.getItem('items'))

  function addTodo(event) {
    event.preventDefault()
    if (inputText.trim() === '') return
    todos.push({
      id: todos.length === 0 ? 0 : Math.max(...todos.map((e) => e.id)) + 1,
      title: inputText,
      checkbox: false,
      dueDate: new Date().toISOString().slice(0, 10),
      notes: '',
      priority: ''
    })
    localStorage.setItem('items', JSON.stringify(todos))
    setInputText('')
  }
  function deleteTodo(id) {
    const removeTodo = todos.filter((todo) => {
      return todo.id !== id
    })
    setTodos(removeTodo)
    localStorage.setItem('items', JSON.stringify(removeTodo))
  }

  function updateCheckBox(check, id) {
    const editTodo = fetchTodos.find((obj) => obj.id === id)
    editTodo.checkbox = !check
    setTodos(fetchTodos)
    localStorage.setItem('items', JSON.stringify(fetchTodos))
  }
  function updateTitle(property, id) {
    const editTodo = fetchTodos.find((obj) => obj.id === id)
    editTodo.title = property
    setTodos(fetchTodos)
    localStorage.setItem('items', JSON.stringify(fetchTodos))
  }
  function updateNote(property, id) {
    const editTodo = fetchTodos.find((obj) => obj.id === id)
    editTodo.notes = property
    setTodos(fetchTodos)
    localStorage.setItem('items', JSON.stringify(fetchTodos))
  }
  function updateDueDate(property, id) {
    const editTodo = fetchTodos.find((obj) => obj.id === id)
    editTodo.dueDate = property
    setTodos(fetchTodos)
    localStorage.setItem('items', JSON.stringify(fetchTodos))
  }
  function updatePriority(property, id) {
    const editTodo = fetchTodos.find((obj) => obj.id === id)
    editTodo.priority = property
    setTodos(fetchTodos)
    localStorage.setItem('items', JSON.stringify(fetchTodos))
  }
  function deleteDone() {
    const editTodo = fetchTodos.filter((obj) => obj.checkbox !== true)
    localStorage.setItem('items', JSON.stringify(editTodo))
  }
  function deleteAll() {
    fetchTodos.splice(0, fetchTodos.length)
    localStorage.setItem('items', JSON.stringify(fetchTodos))
  }
  function showDone() {
    const tempTodos = fetchTodos
    localStorage.setItem('pushItems', JSON.stringify(tempTodos))
    const editTodo = tempTodos.filter((obj) => obj.checkbox === true)
    localStorage.setItem('items', JSON.stringify(editTodo))
  }
  function showAll() {
    const fetchTodos = JSON.parse(localStorage.getItem('pushItems'))
    localStorage.setItem('items', JSON.stringify(fetchTodos))
  }

  return (
    <form className='todoForm'>
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
