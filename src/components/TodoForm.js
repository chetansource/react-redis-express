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
        console.log(inputText)
        if (inputText.trim() === '') return
        todos.push({
            id:
                todos.length === 0
                    ? 0
                    : Math.max(...todos.map((e) => e.id)) + 1,
            title: inputText,
            checkbox: false,
            dueDate: '',
            notes: '',
            priority: ''
        })
        localStorage.setItem('items', JSON.stringify(todos))
        setInputText('')
    }

    return (
        <form>
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
                    <TodoItem key={todo.id} todo={todo} />
                ))}
            </div>
        </form>
    )
}

export default TodoForm
