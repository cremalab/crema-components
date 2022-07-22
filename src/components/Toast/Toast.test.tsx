import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { act } from "react-dom/test-utils"
import { Toast, ToastType } from "./Toast"

describe("Toast", () => {
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
    jest.spyOn(global, "setTimeout")
    const message = "Hello Toast!"

    // Act
    render(<Toast showToast={true} handleClose={jest.fn()} message={message} />)

    // Assert
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 5000)
  })
  it("allows for custom duration", () => {
    // Arrange
    jest.spyOn(global, "setTimeout")
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
    jest.useFakeTimers("modern")
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
  it("has an aria-live value of 'assertive' if type is 'error'", () => {
    // Arrange
    const type = "error"

    // Act
    render(
      <Toast
        type={type}
        showToast={true}
        handleClose={jest.fn()}
        message="Hello Toast!"
      />,
    )

    const received = screen.getByRole("alert")

    // Assert
    expect(received).toHaveAttribute("aria-live", "assertive")
  })
  it("has an aria-live value of 'polite' if not type of 'error'", () => {
    // Arrange
    const type = "success"
    // Act

    render(
      <Toast
        type={type}
        showToast={true}
        handleClose={jest.fn()}
        message="Hello Toast!"
      />,
    )

    const received = screen.getByRole("alert")

    // Assert
    expect(received).toHaveAttribute("aria-live", "polite")
  })
  it("renders toast for each type", () => {
    const types = ["success", "error", "warning", "info"] as ToastType[]
    types.forEach((type) => {
      // Arrange
      const message = "Hello Toast!"
      const label = `a ${type} toast`

      // Act
      render(
        <Toast
          type={type}
          handleClose={jest.fn()}
          message={message}
          showToast={true}
        />,
      )

      const received = screen.getByLabelText(label)

      // Assert
      expect(received).toHaveAttribute("data-type", type)
    })
  })
})
