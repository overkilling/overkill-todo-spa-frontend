import path from 'path'
import { Pact } from '@pact-foundation/pact'

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

  jest.setTimeout(15000)

  beforeAll(() => provider.setup())
  afterAll(() => provider.finalize())
  afterEach(async () => {
    await provider.verify()
  })

  return { provider }
}
