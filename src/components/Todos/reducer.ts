import { Todo } from '@todo/api/types'
import { UpdateTodosAction, UPDATE_TODOS } from './actions'

interface TodosState {
  todos: Todo[]
}

const initalState: TodosState = { todos: [] }

const todosReducer = (
  state: TodosState = initalState,
  { type, todos }: UpdateTodosAction
) => {
  switch (type) {
    case UPDATE_TODOS:
      return { todos }
    default:
      return state
  }
}

export default todosReducer
