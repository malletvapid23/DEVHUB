import { useContext } from 'react'
import { ReactReduxContext } from 'react-redux'
import { RootState } from '../types'

export type ExtractSelector<S> = S extends (state: any) => infer R
  ? (state: RootState) => R
  : (state: RootState) => any

// TODO: This is currently triggering a re-render
// of every function using this hook
// because useContext(ReactReduxContext) is watching storeState.
// Fix this.
export function useReduxState<S extends (state: any) => any>(selector: S) {
  const { storeState } = useContext<{ storeState: RootState }>(
    ReactReduxContext,
  )

  if (!selector) return

  return selector(storeState) as S extends (...args: any[]) => infer R ? R : any
}
