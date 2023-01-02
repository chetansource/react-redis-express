import './App.css'

function App () {
  return (
    <div className='App'>
      <header className='App-header'>
        <label className='heading'> TodoList</label>
        <form>
          <input className='title' type='text' placeholder='what do you want to achieve...?' />
          <button className='submitBtn'>
            ADD TASK
          </button>

        </form>
      </header>
    </div>
  )
}

export default App
