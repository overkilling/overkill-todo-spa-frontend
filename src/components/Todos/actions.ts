import { Todo } from '@todo/api/types'

type UpdateTodos = 'UPDATE_TODOS'

interface UpdateTodosAction {
  type: UpdateTodos
  todos: Todo[]
}

export const updateTodos = (todos: Todo[]): UpdateTodosAction => ({
  type: 'UPDATE_TODOS',
  todos
})
