import { Container, Typography } from '@material-ui/core'
import * as React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Todos, reducers } from '@todo/components'
import { TodoClient } from '@todo/api/client'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducers,
  compose(
    applyMiddleware(sagaMiddleware),
    // @ts-ignore
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)
// sagaMiddleware.run(clockSaga)

const todoClient = new TodoClient('/api')

const AppComponent = () => (
  <Container>
    <Typography variant="h1">Todo App</Typography>
    <Todos todoClient={todoClient} />
  </Container>
)

export const App = () => (
  <Provider store={store}>
    <AppComponent />
  </Provider>
)
