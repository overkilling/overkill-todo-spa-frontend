import path from 'path'
import { Pact } from '@pact-foundation/pact'
import { TodoClient } from '@todo/api/client'

const todoApiProvider = new Pact({
  consumer: 'SPA',
  provider: 'API',
  cors: true,
  log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
  logLevel: 'warn',
  spec: 2,
  pactfileWriteMode: 'update'
})

export const setupTodoApiIntegration = () => {
  const provider = todoApiProvider
  const createClient = () => {
    return new TodoClient(provider.mockService.baseUrl)
  }

  jest.setTimeout(15000)

  beforeAll(() => provider.setup())
  afterAll(() => provider.finalize())
  afterEach(async () => {
    await provider.verify()
  })

  return { provider, createClient }
}
