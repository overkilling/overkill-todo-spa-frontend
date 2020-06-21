import * as React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodos } from './actions'
import { TodosState } from './reducer'

export const Todos = () => {
  const todos = useSelector((state: TodosState) => state.todos)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTodos())
  }, [])

  return (
    <ul>
      {todos.map((item, index) => (
        <li key={index}>{item.todo}</li>
      ))}
    </ul>
  )
}
