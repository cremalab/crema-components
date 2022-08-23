const getInitial = (str: string) => {
  return str.charAt(0).toUpperCase()
}

const getInitialArray = (name: string) => {
  return name.split(" ").map(getInitial)
}

export const getInitials = (name: string) => {
  const initialArray = getInitialArray(name)
  const firstInitial = initialArray[0]
  const lastInitial = initialArray[initialArray.length - 1] ?? ""
  return `${firstInitial}${lastInitial}`
}
