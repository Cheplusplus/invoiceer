import { startTransition, useState } from "react"

const useStateFromServer = <T,>() => {
  const [state, setState] = useState<Promise<T>>()

  const setStateFromServer = (data: Promise<T>) => {
    startTransition(() => {
      setState(data)
    })
  }
  const items: [Promise<T> | undefined, (data: Promise<T>) => void] = [
    state,
    setStateFromServer,
  ]
  return items
}
export default useStateFromServer
