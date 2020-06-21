import { TodoClient } from '@todo/api/client'
import nock from 'nock'
import { expectSaga } from 'redux-saga-test-plan'
import { fetchTodos, updateTodos } from './actions'
import todosSaga from './sagas'

describe('Todos saga', () => {
  const apiBaseUrl = 'http://api.example.com'
  const todoClient = new TodoClient(apiBaseUrl)

  // eslint-disable-next-line jest/expect-expect
  it('fetches todos', () => {
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

    return expectSaga(todosSaga, todoClient)
      .put(updateTodos(responseBody))
      .dispatch(fetchTodos())
      .run()
  })
})
