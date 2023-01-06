import React, { useState } from 'react'
import './TodoItem.css'
function TodoItem(props) {
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
          checked={props.todo.checkbox}
          onChange={() =>
            props.onCheckboxUpdate(props.todo.checkbox, props.todo.id)
          }
        ></input>
        <input
          type='text'
          className='todoTitle'
          value={props.todo.title}
          onClick={handleClick}
          onChange={() => props.onUpdate(props.todo.title, props.todo.id)}
        ></input>
      </div>
      <div className='dropdown'>
        {dropDown && (
          <div>
            <textarea className='textNote' value={props.todo.notes}></textarea>
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
