import axios from 'axios'

export const isApiHealthy = async (): Promise<boolean> => {
  return axios
    .get('http://localhost:3000/health')
    .then(response => response.data)
    .then(text => text === 'ok')
}
