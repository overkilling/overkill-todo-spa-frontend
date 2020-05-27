import axios from 'axios'

export const isApiHealthy = async (apiBaseUrl: string): Promise<boolean> => {
  const instance = axios.create({
    baseURL: apiBaseUrl
  })
  return instance
    .get('/health')
    .then(response => response.data)
    .then(text => text === 'ok')
}
