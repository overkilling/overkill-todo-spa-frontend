import { Todo } from '@todo/api/types'

export const UPDATE_TODOS = 'UPDATE_TODOS'

export interface UpdateTodosAction {
  type: 'UPDATE_TODOS'
  todos: Todo[]
}

export const updateTodos = (todos: Todo[]): UpdateTodosAction => ({
  type: UPDATE_TODOS,
  todos
})
