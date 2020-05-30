import * as Matchers from '@pact-foundation/pact/dsl/matchers'
import { isApiHealthy } from './healthcheck'
import { setupTodoApiIntegration } from '../support/pactHelper'

describe('Healthcheck API Pact test', () => {
  const { provider } = setupTodoApiIntegration()

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
          status: Matchers.term({
            matcher: 'ok|fail',
            generate: 'ok'
          })
        }
      }
    })

    const healthResponse = await isApiHealthy(provider.mockService.baseUrl)
    expect(healthResponse).toBeTruthy()
  })
})
