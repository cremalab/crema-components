import { render, screen } from "@testing-library/react"
import { Sidebar } from "./Sidebar"

describe("Sidebar", () => {
  it("name prop is rendered", () => {
    // Arrange
    const message = "Hi, my name is Sidebar!"

    const onClose = jest.fn()

    // Act
    render(
      <Sidebar isOpen={true} onClose={onClose}>
        {message}
      </Sidebar>,
    )
    const received = screen.getByText(message)

    // Assert
    expect(received).toBeDefined()
  })
})
