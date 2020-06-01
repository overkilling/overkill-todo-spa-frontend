import { TodoClient } from '@todo/api/client'
import { Todo } from '@todo/api/types'
import * as React from 'react'
import { useEffect, useState } from 'react'

interface TodosProps {
  todoClient: TodoClient
}

export const Todos = ({ todoClient }: TodosProps) => {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    todoClient.getTodos().then(newTodos => {
      setTodos(newTodos)
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
