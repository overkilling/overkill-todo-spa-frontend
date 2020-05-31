import axios, { AxiosInstance } from 'axios'

interface Todo {
  todo: string
}

export class TodoClient {
  private httpClient: AxiosInstance

  constructor(apiBaseUrl: string) {
    this.httpClient = axios.create({
      baseURL: apiBaseUrl
    })
  }

  async getTodos(): Promise<Todo[]> {
    const response = await this.httpClient.get('/todos')
    return response.data
  }

  async isApiHealthy(): Promise<boolean> {
    return this.httpClient
      .get('/health')
      .then(response => response.data.status)
      .then(text => text === 'ok')
  }
}
