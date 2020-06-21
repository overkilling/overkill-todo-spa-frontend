import { render } from '@todo/support/render-for-redux'
import * as React from 'react'
import configureMockStore from 'redux-mock-store'
import { fetchTodos } from './actions'
import { Todos } from './Todos'

describe('Todos component', () => {
  const mockStore = configureMockStore()

  it('renders list of todos', () => {
    const store = mockStore({
      todos: [
        { todo: 'Some task' },
        { todo: 'Another task' },
        { todo: 'Yet another task' }
      ]
    })
    const { getByText } = render(<Todos />, { store })

    expect(getByText('Some task')).toBeInTheDocument()
    expect(getByText('Another task')).toBeInTheDocument()
    expect(getByText('Yet another task')).toBeInTheDocument()
  })

  it('dispatches action to fetch todos', () => {
    const store = mockStore({ todos: [] })
    render(<Todos />, { store })

    expect(store.getActions()).toEqual([fetchTodos()])
  })
})
