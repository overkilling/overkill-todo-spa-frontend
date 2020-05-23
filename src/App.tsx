import { Container, Typography } from '@material-ui/core'
import * as React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  combineReducers({}),
  compose(
    applyMiddleware(sagaMiddleware),
    // @ts-ignore
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)
// sagaMiddleware.run(clockSaga)

const AppComponent = () => (
  <Container>
    <Typography variant="h1">Todo App</Typography>
  </Container>
)

export const App = () => (
  <Provider store={store}>
    <AppComponent />
  </Provider>
)
