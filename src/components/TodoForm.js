import { useState } from 'react'
import React from 'react'
import './TodoForm.css'
import TodoItem from './TodoItem.js'

let id = 0

function TodoForm() {
    const [inputText, setInputText] = useState('')
    const [todos, setTodos] = useState([])

    function addTodo(event) {
        event.preventDefault()
        console.log(inputText)
        if (inputText.trim() === '') return
        todos.push({
            id: id++,
            title: inputText,
            checkbox: false,
            notes: '',
            priority: ''
        })
        // console.log('after adding', todos)
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
