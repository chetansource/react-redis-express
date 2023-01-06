import { useState } from 'react'
import React from 'react'
import './TodoForm.css'
import TodoItem from './TodoItem.js'

function TodoForm() {
  const [inputText, setInputText] = useState('')
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('items')) || []
  )

  function addTodo(event) {
    event.preventDefault()
    if (inputText.trim() === '') return
    todos.push({
      id: todos.length === 0 ? 0 : Math.max(...todos.map((e) => e.id)) + 1,
      title: inputText,
      checkbox: false,
      dueDate: '',
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
    const tempTodos = JSON.parse(localStorage.getItem('items'))
    const tempTodo = tempTodos.find((obj) => obj.id === id)
    tempTodo.checkbox = !check
    setTodos(tempTodos)
    localStorage.setItem('items', JSON.stringify(tempTodos))
  }
  function updateTodo(property, id) {
    const tempTodos = JSON.parse(localStorage.getItem('items'))
    const tempTodo = tempTodos.find((obj) => obj.id === id)
    tempTodo.title = property
    setTodos(tempTodos)
    localStorage.setItem('items', JSON.stringify(tempTodos))
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
            onUpdate={updateTodo}
          />
        ))}
      </div>
    </form>
  )
}

export default TodoForm
