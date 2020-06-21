import { TodoClient } from '@todo/api/client'
import * as React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateTodos } from './actions'
import { TodosState } from './reducer'

interface TodosProps {
  todoClient: TodoClient
}

export const Todos = ({ todoClient }: TodosProps) => {
  const todos = useSelector((state: TodosState) => state.todos)
  const dispatch = useDispatch()

  useEffect(() => {
    todoClient.getTodos().then(newTodos => {
      dispatch(updateTodos(newTodos))
    })
  }, [])

  return (
    <ul>
      {todos.map((item, index) => (
        <li key={index}>{item.todo}</li>
      ))}
    </ul>
  )
}
