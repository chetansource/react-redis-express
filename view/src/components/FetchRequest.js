const globalUrl = 'http://localhost:3000/Todos/'

export async function getTodos() {
  try {
    const url = globalUrl
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error status:${response.status}`)
    }
    const data = await response.json() // extracting the data from json object
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function insertTodo(input) {
  try {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: input
      })
    }
    const url = globalUrl
    const response = await fetch(url, config)
    if (!response.ok) {
      throw new Error(`HTTP error status:${response.status}`)
    }
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function updateTodo(field, val, id) {
  try {
    const config = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        property: field,
        value: val
      })
    }
    const url = globalUrl + id
    const response = await fetch(url, config)
    if (!response.ok) {
      throw new Error(`HTTP error status:${response.status}`)
    }
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function removeTodo(id) {
  try {
    const config = {
      method: 'DELETE'
    }
    const url = globalUrl + id
    const response = await fetch(url, config)
    if (!response.ok) {
      throw new Error(`HTTP error status:${response.status}`)
    }
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function removeDone(id) {
  try {
    const config = {
      method: 'DELETE'
    }
    const url = globalUrl + 'TodosDone'
    const response = await fetch(url, config)
    if (!response.ok) {
      throw new Error(`HTTP error status:${response.status}`)
    }
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function removeAll(id) {
  try {
    const config = {
      method: 'DELETE'
    }
    const url = globalUrl + 'TodosAll'
    const response = await fetch(url, config)
    if (!response.ok) {
      throw new Error(`HTTP error status:${response.status}`)
    }
    return response
  } catch (error) {
    console.log(error)
  }
}
