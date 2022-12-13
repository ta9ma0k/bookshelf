type LoadingStateType<T> =
  | { status: 'pending' }
  | { status: 'fulfilled'; data: T }
  | { status: 'rejected'; error: unknown }
export type Resource<T> = {
  read: () => T
}

export const wrapPromise = <T>(promise: Promise<T>): Resource<T> => {
  let state: LoadingStateType<T> = { status: 'pending' }

  const suspender = promise.then(
    (r) => {
      state = { status: 'fulfilled', data: r }
    },
    (e) => {
      state = { status: 'rejected', error: e }
    }
  )

  const read = () => {
    if (state.status === 'pending') {
      throw suspender
    } else if (state.status === 'rejected') {
      throw state.error
    } else {
      return state.data
    }
  }
  return { read }
}

export const toResource = <T extends unknown[], U>(
  fn: (...args: T) => Promise<U>
): ((...args: T) => Resource<U>) => {
  const wrapFunc = (...args: T): Resource<U> => {
    return wrapPromise(fn(...args))
  }
  return wrapFunc
}
