import { useState } from 'react'
import React from 'react'
import './TodoForm.css'
import TodoItem from './TodoItem.js'

function TodoForm() {
    let id = 0
    const [inputText, setInputText] = useState('')
    const [todos, setTodos] = useState([])
    function handleSubmit(event) {
        event.preventDefault()
    }

    function addTodo() {
        setTodos([
            ...todos,
            {
                id: id++,
                title: inputText,
                notes: '',
                dueDate: new Date(),
                priority: ''
            }
        ])
        console.log(todos)
        setInputText('')
    }
    return (
        <form onSubmit={handleSubmit}>
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
            <div>
                {todos.map((todo) => (
                    <TodoItem key={todo.id} todoInfo={todo} />
                ))}
            </div>

            {/* <div>
                {todos.map((todo) => (
                    <li key={todo.id}>{todo.title}</li>
                ))}
            </div> */}
        </form>
    )
}

export default TodoForm
