import { useEffect, useState } from 'react'
import React from 'react'
import './TodoForm.css'
import TodoItem from './TodoItem.js'
import { getTodos, insertTodo, removeTodo, updateTodo } from './FetchRequest.js'

function TodoForm() {
  const [inputText, setInputText] = useState('')
  const [todos, setTodos] = useState([])
  const fetchTodos = JSON.parse(localStorage.getItem('items'))

  async function addTodo(event) {
    event.preventDefault()
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

  //useEffect hook
  useEffect(() => {
    getTodos().then((todos) => {
      setTodos(todos)
    })
  }, [])

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
