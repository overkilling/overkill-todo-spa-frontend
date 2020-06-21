import { fetchTodos, FETCH_TODOS, updateTodos, UPDATE_TODOS } from './actions'

describe('Todo Actions', () => {
  it('returns action for UPDATE_TODOS', () => {
    const todos = [{ todo: 'Some todo' }, { todo: 'Another Todo' }]
    const action = updateTodos(todos)

    expect(action).toEqual({
      type: UPDATE_TODOS,
      todos
    })
  })

  it('returns action for FETCH_TODOS', () => {
    const action = fetchTodos()

    expect(action).toEqual({ type: FETCH_TODOS })
  })
})
