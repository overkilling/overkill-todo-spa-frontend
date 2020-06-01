import * as React from 'react'
import { render, waitFor } from '@testing-library/react'
import { Todos } from './Todos'
import { TodoClient } from '@todo/api/client'
import nock from 'nock'

describe('Todos component', () => {
  const apiBaseUrl = 'http://api.example.com'
  const todoClient = new TodoClient(apiBaseUrl)

  it('renders list of todos', async () => {
    const responseBody = [
      { todo: 'Some task' },
      { todo: 'Another task' },
      { todo: 'Yet another task' }
    ]
    const responseHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Contet-Type': 'application/json'
    }
    nock(apiBaseUrl).get('/todos').reply(200, responseBody, responseHeaders)

    const { getByText } = render(<Todos todoClient={todoClient} />)

    await waitFor(() => {
      expect(getByText('Some task')).toBeInTheDocument()
    })

    expect(getByText('Some task')).toBeInTheDocument()
    expect(getByText('Another task')).toBeInTheDocument()
    expect(getByText('Yet another task')).toBeInTheDocument()
  })
})
