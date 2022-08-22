const capitalize = (str: string) => str.toUpperCase()

const getFirstChar = (str: string) => str.charAt(0)

const getInitial = (str: string) => {
  const firstChar = getFirstChar(str)
  const capitalized = capitalize(firstChar)
  return capitalized
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
