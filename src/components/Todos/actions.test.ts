import { updateTodos } from './actions'

describe('Todo Actions', () => {
  it('returns action for UPDATE_TODOS', () => {
    const todos = [{ todo: 'Some todo' }, { todo: 'Another Todo' }]
    const action = updateTodos(todos)

    expect(action).toEqual({
      type: 'UPDATE_TODOS',
      todos
    })
  })
})
