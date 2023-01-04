import React from 'react'
function TodoItem(todo) {
    // console.log('todo:', todo)
    // const [todo2, setTodo2] = useState({})

    return (
        <div>
            <input
                id={todo.id}
                type='text'
                className='todoTitle'
                value={todo.title}
            />
        </div>
    )
}
export default TodoItem
