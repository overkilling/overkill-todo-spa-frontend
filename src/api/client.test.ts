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
    const mockEndpoint = nock(apiBaseUrl).get('/todos')

    it('fetches a list of todos', async () => {
      const responseBody = [
        { todo: 'Some task' },
        { todo: 'Another task' },
        { todo: 'Yet another task' }
      ]
      mockEndpoint.reply(200, responseBody, responseHeaders)

      await expect(client.getTodos()).resolves.toEqual(responseBody)
    })

    it('rejects when API response is malformed', async () => {
      mockEndpoint.reply(200, 'malformed', responseHeaders)

      await expect(client.getTodos()).rejects.toMatchObject({
        response: { status: 200, data: 'malformed' },
        message: 'invalid response schema'
      })
    })

    it('rejects when API returns error', async () => {
      mockEndpoint.reply(500, 'servererror', responseHeaders)

      await expect(client.getTodos()).rejects.toMatchObject({
        response: { status: 500 }
      })
    })

    it('rejects when request fails', async () => {
      console.error = jest.fn()
      mockEndpoint.replyWithError('something bad happened')

      await expect(client.getTodos()).rejects.toMatchObject({
        message: 'Network Error'
      })
      expect(console.error).toBeCalled()
    })
  })

  describe('healthcheck', () => {
    const mockEndpoint = nock(apiBaseUrl).get('/health')

    it('is healthy for health API response', async () => {
      mockEndpoint.reply(200, { status: 'ok' }, responseHeaders)

      await expect(client.isApiHealthy()).resolves.toBeTruthy()
    })

    it('is unhealthy for unhealthy API response', async () => {
      mockEndpoint.reply(200, { status: 'fail' }, responseHeaders)

      await expect(client.isApiHealthy()).resolves.toBeFalsy()
    })

    it('is unhealthy for error code API response ', async () => {
      mockEndpoint.reply(500, { status: 'ok' }, responseHeaders)

      await expect(client.isApiHealthy()).resolves.toBeFalsy()
    })

    it('is unhealthy for request error', async () => {
      console.error = jest.fn()
      mockEndpoint.replyWithError('something bad happend')

      await expect(client.isApiHealthy()).resolves.toBeFalsy()
      expect(console.error).toBeCalled()
    })
  })
})
