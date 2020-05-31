import {
  term,
  eachLike,
  somethingLike
} from '@pact-foundation/pact/dsl/matchers'
import { setupTodoApiIntegration } from '@todo/support/pact'

describe('Todos API pact test', () => {
  const { provider, createClient } = setupTodoApiIntegration()

  it('fetches list of todos', async () => {
    await provider.addInteraction({
      state: 'user has todos',
      uponReceiving: 'get todos',
      withRequest: {
        method: 'GET',
        path: '/todos'
      },
      willRespondWith: {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        },
        body: eachLike({
          todo: somethingLike('task')
        })
      }
    })

    const todos = await createClient().getTodos()
    expect(todos).toBeTruthy()
  })

  it('checks API status', async () => {
    await provider.addInteraction({
      state: 'application is healthy',
      uponReceiving: 'healthcheck',
      withRequest: {
        method: 'GET',
        path: '/health'
      },
      willRespondWith: {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          status: term({
            matcher: 'ok|fail',
            generate: 'ok'
          })
        }
      }
    })

    const healthResponse = await createClient().isApiHealthy()
    expect(healthResponse).toBeTruthy()
  })
})
