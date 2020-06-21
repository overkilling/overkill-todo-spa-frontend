import todosReducer, {
  initialState as todosInitialState
} from './Todos/reducer'
import todosSaga from './Todos/sagas'

export { Todos } from './Todos'
export const reducers = todosReducer
export { TodosState as CombinedState } from './Todos/reducer'
export const initialState = todosInitialState
export const sagas = todosSaga
