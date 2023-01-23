import React from 'react'

function TodoFooter(props) {
  return (
    <footer className='footerButton'>
      <button className='delDone' onClick={props.onDeleteDone}>
        Delete Completed
      </button>
      <button className='delAll' onClick={props.onDeleteAll}>
        Delete All
      </button>
      <button className='showDone' onClick={props.onShowDone}>
        Show Done
      </button>
      <button className='showAll' onClick={props.onShowAll}>
        Show All
      </button>
    </footer>
  )
}

export default TodoFooter
