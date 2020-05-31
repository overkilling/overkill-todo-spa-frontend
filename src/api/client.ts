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
    return this.httpClient.get<Todo[]>('/todos').then(async ({ data }) => data)
  }

  async isApiHealthy(): Promise<boolean> {
    return this.httpClient
      .get('/health')
      .then(({ data: { status } }) => status === 'ok')
      .catch(() => false)
  }
}
