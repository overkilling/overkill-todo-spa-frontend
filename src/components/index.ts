import todosReducer, {
  initialState as todosInitialState
} from './Todos/reducer'

export { Todos } from './Todos'

export const reducers = todosReducer
export { TodosState as CombinedState } from './Todos/reducer'
export const initialState = todosInitialState
