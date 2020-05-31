import Ajv from 'ajv'
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import todoSchema from './todos.schema.json'
import { Todo } from './types'

export class TodoClient {
  private httpClient: AxiosInstance
  private validateTodoResponse: ResponseDecorator<Todo[]>

  constructor(apiBaseUrl: string) {
    this.httpClient = axios.create({
      baseURL: apiBaseUrl
    })
    this.validateTodoResponse = schemaValidator<Todo[]>(todoSchema)
  }

  async getTodos(): Promise<Todo[]> {
    return this.httpClient
      .get('/todos')
      .then(this.validateTodoResponse)
      .then(({ data }) => data)
  }

  async isApiHealthy(): Promise<boolean> {
    return this.httpClient
      .get('/health')
      .then(({ data: { status } }) => status === 'ok')
      .catch(() => false)
  }
}

type ResponseDecorator<T> = (response: AxiosResponse<T>) => AxiosResponse<T>

const schemaValidator = <T>(schema: object): ResponseDecorator<T> => {
  const validate = Ajv().compile(schema)

  return (response: AxiosResponse<T>) => {
    if (!validate(response.data)) {
      const error = new Error('invalid response schema') as AxiosError
      error.response = response
      throw error
    }
    return response
  }
}
