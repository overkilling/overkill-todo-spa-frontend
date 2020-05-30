import axios from 'axios'

interface Todo {
  todo: string
}

export const getTodos = async (apiBaseUrl: string): Promise<Todo[]> => {
  const instance = axios.create({
    baseURL: apiBaseUrl
  })
  return instance.get('/todos').then(response => response.data)
}
