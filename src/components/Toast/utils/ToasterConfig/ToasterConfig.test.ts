import { ToasterConfig } from "./ToasterConfig"

describe("ToasterConfig", () => {
  it("getConfig returns a default object when no params are passed", () => {
    // Arrange
    const { getConfig } = new ToasterConfig()

    // Act
    const received = getConfig()
    const expected = {
      duration: 5000,
      animationDuration: 300,
      position: {
        vertical: "center",
        horizontal: "center",
      },
      behavior: "stack",
    }

    // Assert
    expect(received).toEqual(expected)
  })
})
