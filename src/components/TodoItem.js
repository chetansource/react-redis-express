import React, { useState } from 'react'
import './TodoItem.css'
function TodoItem(props) {
  console.log(props.onDelete)
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
      <div className='addTodo'>
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
      </div>
      <div className='dropdown'>
        {dropDown && (
          <div>
            <textarea className='textNote' value={props.todo.note}></textarea>
            <div className='elements'>
              <div>
                <label for='dateInput'>DueDate:</label>
                <input
                  type='date'
                  id='dueDate'
                  value={props.todo.dueDate}
                ></input>
              </div>
              <div>
                <label for='primacy'>Priority:</label>
                <select value={priority} onChange={handlePriority}>
                  {optionList.map((item) => {
                    return <option>{item}</option>
                  })}
                </select>
              </div>
              <button
                className='delTodo'
                onClick={() => props.onDelete(props.todo.id)}
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
