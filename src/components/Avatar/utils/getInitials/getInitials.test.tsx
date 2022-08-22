import { getInitials } from "./getInitials"

describe("getInitials", () => {
  it("takes in a name and returns the first and maybe last initial", () => {
    // Arrange
    const name = "Crema Components"

    // Act
    const initials = getInitials(name)

    const expected = "CC"

    // Assert
    expect(initials).toBe(expected)
  })
  it("capitalizes each initial", () => {
    // Arrange
    const name = "hello world"

    // Act
    const initials = getInitials(name)

    const expected = "HW"

    // Assert
    expect(initials).toBe(expected)
  })
  it("generates initials for complex names", () => {
    // Arrange
    const name = "This is a complext name"

    // Act
    const initials = getInitials(name)

    const expected = "TN"

    // Assert
    expect(initials).toBe(expected)
  })
})
