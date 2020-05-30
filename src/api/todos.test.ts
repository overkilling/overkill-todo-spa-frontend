import nock from 'nock'
import { getTodos } from './todos'

describe('Todos API', () => {
  const apiBaseUrl = 'http://api.example.com'

  it('fetches a list of todos', async () => {
    const responseBody = [
      { todo: 'Some task' },
      { todo: 'Another task' },
      { todo: 'Yet another task' }
    ]
    const responseHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Contet-Type': 'application/json'
    }
    nock(apiBaseUrl).get('/todos').reply(200, responseBody, responseHeaders)

    const todos = await getTodos(apiBaseUrl)
    expect(todos).toEqual(responseBody)
  })
})
