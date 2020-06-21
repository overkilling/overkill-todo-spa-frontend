import { call, put, takeEvery } from 'redux-saga/effects'
import { FETCH_TODOS, updateTodos } from './actions'
import { TodoClient } from '@todo/api/client'

function* fetchTodos(todoClient: TodoClient) {
  try {
    const todos = yield call([todoClient, todoClient.getTodos])
    yield put(updateTodos(todos))
  } catch (e) {}
}

export default function* todosSaga(todoClient: TodoClient) {
  yield takeEvery(FETCH_TODOS, fetchTodos, todoClient)
}
