import { eachLike, somethingLike } from '@pact-foundation/pact/dsl/matchers'
import { setupTodoApiIntegration } from '../support/pactHelper'
import { getTodos } from './todos'

describe('Todos API pact test', () => {
  const { provider } = setupTodoApiIntegration()

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

    const todos = await getTodos(provider.mockService.baseUrl)
    expect(todos).toBeTruthy()
  })
})
