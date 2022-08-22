const capitalize = (str: string) => str.toUpperCase()

const getFirstChar = (str: string) => str.charAt(0)

const getInitial = (str: string) => {
  const firstChar = getFirstChar(str)
  const capitalized = capitalize(firstChar)
  return capitalized
}

const getInitialsArray = (name: string) => {
  return name.split(" ").map(getInitial)
}

export const getInitials = (name: string) => {
  const initialsArray = getInitialsArray(name)
  const firstInitial = initialsArray[0]
  const lastInitial = initialsArray[initialsArray.length - 1] ?? ""
  return `${firstInitial}${lastInitial}`
}
