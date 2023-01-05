import React, { useState } from 'react'
import './TodoItem.css'
function TodoItem(props) {
    // const [checkbox, setCheckBox] = useState(false)
    // function updateCheckBox() {
    //     let tempTodos = JSON.parse(localStorage.getItem('items'))

    //     localStorage.setItem('items', JSON.stringify(tempTodos))
    // }

    function deleteTodo(id) {
        // let tempTodos = JSON.parse(localStorage.getItem('items'))
        // tempTodos = tempTodos.filter((todo) => todo.id !== id)
        // localStorage.setItem('items', JSON.stringify(tempTodos))
    }

    const optionList = ['none', 'low', 'medium', 'high']
    const [priority, setPriority] = useState('none')
    function handlePriority(e) {
        setPriority(e.target.value)
    }

    const [dropDown, setDropDown] = useState(false)
    function handleClick() {
        setDropDown(!dropDown)
    }

    return (
        <div>
            <input
                type='checkbox'
                className='checkBox'
                value={props.todo.checkbox}
            ></input>

            <input
                type='text'
                className='todoTitle'
                value={props.todo.title}
                onClick={handleClick}
            ></input>
            <div>
                {dropDown && (
                    <div>
                        <textarea
                            className='textNote'
                            value={props.todo.note}
                        ></textarea>
                        <label for='dateInput'>DueDate:</label>
                        <input
                            type='date'
                            id='dueDate'
                            value={props.todo.dueDate}
                        ></input>
                        <label for='primacy'>Priority:</label>
                        <select value={priority} onChange={handlePriority}>
                            {optionList.map((item) => {
                                return <option>{item}</option>
                            })}
                        </select>
                        <div>
                            <button
                                className='delTodo'
                                onClick={deleteTodo(props.todo.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default TodoItem
