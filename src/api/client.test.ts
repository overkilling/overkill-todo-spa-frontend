import nock from 'nock'
import { TodoClient } from './client'

describe('Todos API Client', () => {
  const apiBaseUrl = 'http://api.example.com'
  const client = new TodoClient(apiBaseUrl)
  const responseHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Contet-Type': 'application/json'
  }

  describe('getting todos', () => {
    it('fetches a list of todos', async () => {
      const responseBody = [
        { todo: 'Some task' },
        { todo: 'Another task' },
        { todo: 'Yet another task' }
      ]
      nock(apiBaseUrl).get('/todos').reply(200, responseBody, responseHeaders)

      const todos = await client.getTodos()
      expect(todos).toEqual(responseBody)
    })
  })

  describe('healthcheck', () => {
    it('returns true for healthy API', async () => {
      nock(apiBaseUrl)
        .get('/health')
        .reply(200, { status: 'ok' }, responseHeaders)

      const healthResponse = await client.isApiHealthy()
      expect(healthResponse).toBeTruthy()
    })

    it('returns false for unhealthy API', async () => {
      nock(apiBaseUrl)
        .get('/health')
        .reply(200, { status: 'fail' }, responseHeaders)

      const healthResponse = await client.isApiHealthy()
      expect(healthResponse).toBeFalsy()
    })
  })
})
