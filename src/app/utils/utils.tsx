export const getObjectFromForm = <T extends {}>(data: FormData): T => {
  let t = {}
  for (const pair of data.entries()) {
    const y = { [pair[0]]: pair[1] }
    t = { ...t, ...y }
  }
  return t as T
}
