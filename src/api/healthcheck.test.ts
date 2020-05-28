import nock from 'nock'
import { isApiHealthy } from './healthcheck'

describe('Healthcheck API', () => {
  const apiBaseUrl = 'http://api.example.com'

  it('returns true for healthy API', async () => {
    nock(apiBaseUrl)
      .get('/health')
      .reply(200, { status: 'ok' }, { 'Access-Control-Allow-Origin': '*' })

    const healthResponse = await isApiHealthy(apiBaseUrl)
    expect(healthResponse).toBeTruthy()
  })

  it('returns false for unhealthy API', async () => {
    nock(apiBaseUrl)
      .get('/health')
      .reply(200, { status: 'fail' }, { 'Access-Control-Allow-Origin': '*' })

    const healthResponse = await isApiHealthy(apiBaseUrl)
    expect(healthResponse).toBeFalsy()
  })
})
