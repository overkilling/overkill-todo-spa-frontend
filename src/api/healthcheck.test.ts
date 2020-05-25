import nock from 'nock'
import { isApiHealthy } from './healthcheck'

describe('Healthcheck API', () => {
  it('returns true for healthy API', async () => {
    nock('http://localhost:3000')
      .get('/health')
      .reply(200, 'ok', { 'Access-Control-Allow-Origin': '*' })

    const healthResponse = await isApiHealthy()
    expect(healthResponse).toBeTruthy()
  })

  it('returns false for unhealthy API', async () => {
    nock('http://localhost:3000')
      .get('/health')
      .reply(200, 'fail', { 'Access-Control-Allow-Origin': '*' })

    const healthResponse = await isApiHealthy()
    expect(healthResponse).toBeFalsy()
  })
})
