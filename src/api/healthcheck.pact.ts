import path from 'path'
import { Pact } from '@pact-foundation/pact'
import * as Matchers from '@pact-foundation/pact/dsl/matchers'
import { isApiHealthy } from './healthcheck'

const provider = new Pact({
  consumer: 'SPA',
  provider: 'API',
  cors: true,
  log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
  logLevel: 'warn',
  spec: 2
})

describe('Healthcheck API Pact test', () => {
  beforeAll(() => provider.setup())
  afterEach(async () => await provider.verify())
  afterAll(async () => await provider.finalize())

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
