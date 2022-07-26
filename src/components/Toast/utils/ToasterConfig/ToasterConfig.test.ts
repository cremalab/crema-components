import { ToasterConfig } from "./ToasterConfig"

describe("ToasterConfig", () => {
  it("getConfig returns a default object when no params are passed", () => {
    // Arrange
    const toasterConfig = new ToasterConfig()

    // Act
    const received = toasterConfig.getConfig()
    const expected = {
      duration: 5000,
      animationDuration: 300,
      position: {
        vertical: "bottom",
        horizontal: "center",
      },
      behavior: "stack",
    }

    // Assert
    expect(received).toEqual(expected)
  })
  it("getConfig returns an object based on params that are passed", () => {
    // Arrange
    const toasterConfig = new ToasterConfig({
      animationDuration: 400,
      duration: 300,
      behavior: "replace",
      position: { horizontal: "left", vertical: "center" },
    })

    // Act
    const received = toasterConfig.getConfig()
    const expected = {
      animationDuration: 400,
      duration: 300,
      behavior: "replace",
      position: { horizontal: "left", vertical: "center" },
    }

    // Assert
    expect(received).toEqual(expected)
  })
})
