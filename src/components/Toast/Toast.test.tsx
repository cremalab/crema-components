import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { act } from "react-dom/test-utils"
import { Toast } from "./Toast"

describe("Toast", () => {
  beforeEach(() => {
    jest.useFakeTimers("modern")
    jest.spyOn(global, "setTimeout")
  })
  // afterEach(() => {
  //   jest.runOnlyPendingTimers()
  //   jest.clearAllMocks()
  //   jest.useRealTimers()
  // })
  it("is not visible when 'showToast' is false", () => {
    // Arrange
    const message = "Hello Toast!"

    // Act
    render(
      <Toast handleClose={jest.fn()} message={message} showToast={false} />,
    )

    const received = screen.queryByText(message)

    // Assert
    expect(received).not.toBeInTheDocument()
  })
  it("is visible when 'showToast' is true", () => {
    // Arrange
    const message = "Hello Toast!"

    // Act
    render(<Toast handleClose={jest.fn()} message={message} showToast={true} />)

    const received = screen.getByText(message)

    // Assert
    expect(received).toBeInTheDocument()
  })
  it("has a default duration of 5000ms", () => {
    // Arrange
    const message = "Hello Toast!"

    // Act
    render(<Toast showToast={true} handleClose={jest.fn()} message={message} />)

    // Assert
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 5000)
  })
  it("allows for custom duration", () => {
    // Arrange
    const message = "Hello Toast!"

    // Act
    render(
      <Toast
        showToast={true}
        handleClose={jest.fn()}
        message={message}
        duration={3000}
      />,
    )

    // Assert
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 3000)
  })
  it("does something", async () => {
    // Arrange
    const toastMessage = "Hello Toast!"
    const handleClose = jest.fn()

    // Act
    render(
      <Toast
        duration={10}
        handleClose={handleClose}
        message={toastMessage}
        showToast={true}
      />,
    )

    const received = screen.getByText(toastMessage)

    act(() => {
      jest.advanceTimersByTime(20)
    })

    fireEvent.transitionEnd(received)

    // Assert
    await waitFor(() => {
      expect(handleClose).toHaveBeenCalledTimes(1)
    })
  })
})
