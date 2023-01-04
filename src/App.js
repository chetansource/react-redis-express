import React from 'react'
import './App.css'

import TodoForm from './components/TodoForm.js'

function App() {
  return (
    <div className='App'>
      <label className='heading'> TodoList</label>
      <TodoForm />
    </div>
  )
}

export default App
