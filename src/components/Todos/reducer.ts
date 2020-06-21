import { Todo } from '@todo/api/types'
import { UpdateTodosAction, UPDATE_TODOS } from './actions'

export interface TodosState {
  todos: Todo[]
}

export const initialState: TodosState = { todos: [] }

const todosReducer = (
  state: TodosState = initialState,
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
