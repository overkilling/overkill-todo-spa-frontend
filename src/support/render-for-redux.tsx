import {
  render as realRender,
  RenderOptions,
  RenderResult
} from '@testing-library/react'
import {
  CombinedState,
  initialState as reducerInitialState,
  reducers
} from '@todo/components'
import * as React from 'react'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { createStore, Store } from 'redux'

export * from '@testing-library/react'

interface RenderWithReduxOptions extends RenderOptions {
  initialState?: CombinedState
  store?: Store
}

export const render = (
  ui: React.ReactElement,
  {
    initialState = reducerInitialState,
    store = createStore(reducers, initialState),
    ...renderOptions
  }: RenderWithReduxOptions = {}
): RenderResult => {
  const wrapper = ({ children }: { children?: ReactNode }) => {
    return <Provider store={store}>{children}</Provider>
  }

  return realRender(ui, { wrapper, ...renderOptions })
}
