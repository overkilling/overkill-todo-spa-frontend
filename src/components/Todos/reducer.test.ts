import reducer from './reducer'
import { updateTodos } from './actions'

describe('Todo reducer', () => {
  it('has initial state', () => {
    expect(reducer(undefined, {} as any)).toEqual({ todos: [] })
  })

  it('updates state with todos', () => {
    const state = {
      todos: [{ todo: 'Some todo' }, { todo: 'Another Todo' }]
    }
    const newTodos = [{ todo: 'Some new todo' }, { todo: 'Another new todo' }]

    expect(reducer(state, updateTodos(newTodos))).toEqual({
      todos: newTodos
    })
  })
})
