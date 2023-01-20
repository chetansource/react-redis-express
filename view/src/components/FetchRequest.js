const globalUrl = 'http://localhost:3000/todos/'

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

export async function removeDone() {
  try {
    const config = {
      method: 'DELETE'
    }
    const url = globalUrl + '?checkbox=true'
    console.log(url)
    const response = await fetch(url, config)
    console.log(response)
    if (!response.ok) {
      throw new Error(`HTTP error status:${response.status}`)
    }
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function removeAll() {
  try {
    const config = {
      method: 'DELETE'
    }
    const url = globalUrl + '?checkbox=false'
    const response = await fetch(url, config)
    console.log(response)
    if (!response.ok) {
      throw new Error(`HTTP error status:${response.status}`)
    }
    return response
  } catch (error) {
    console.log(error)
  }
}
