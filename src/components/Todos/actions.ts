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

export const FETCH_TODOS = 'FETCH_TODOS'

export interface FetchTodosAction {
  type: 'FETCH_TODOS'
}

export const fetchTodos = (): FetchTodosAction => ({
  type: FETCH_TODOS
})
