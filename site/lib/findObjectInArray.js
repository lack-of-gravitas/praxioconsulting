export function findObjectInArray(array, key, value) {
  return array.reduce((acc, curr) => {
    if (curr[key] === value) {
      return curr
    }
    return acc
  }, null)
}
