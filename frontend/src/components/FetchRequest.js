const globalUrl = 'http://localhost:3000/'

export async function getTodos() {
  try {
    const url = globalUrl + 'hGetAll'
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
    const url = globalUrl + 'hSet'
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
    const url = globalUrl + 'hSet/' + id
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
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const url = globalUrl + 'hDel/' + id
    const response = await fetch(url, config)
    if (!response.ok) {
      throw new Error(`HTTP error status:${response.status}`)
    }
    return response
  } catch (error) {
    console.log(error)
  }
}
