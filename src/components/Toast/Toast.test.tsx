import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Toast, ToastAction, ToastStatus } from "./Toast"

describe("Toast", () => {
  it("has an aria-live value of 'assertive' if type is 'error'", () => {
    // Arrange
    const status = "error"

    // Act
    render(<Toast id={1} status={status} message="Hello Toast!" />)

    const received = screen.getByRole("alert")

    // Assert
    expect(received).toHaveAttribute("aria-live", "assertive")
  })

  it("has an aria-live value of 'polite' if not type of 'error'", () => {
    // Arrange
    const status = "success"
    // Act

    render(<Toast id={1} status={status} message="Hello Toast!" />)

    const received = screen.getByRole("alert")

    // Assert
    expect(received).toHaveAttribute("aria-live", "polite")
  })

  it("renders toast for each type", () => {
    const statuses = ["success", "error", "warning", "info"] as ToastStatus[]

    statuses.forEach((status) => {
      // Arrange
      const message = "Hello Toast!"
      const label = `a ${status} toast`

      // Act
      render(<Toast id={1} status={status} message={message} />)

      const received = screen.getByLabelText(label)

      // Assert
      expect(received).toHaveAttribute("data-type", status)
    })
  })

  it("invokes onDismiss callback", async () => {
    // Arrange
    const onDismiss = jest.fn()
    const action = { type: "dismiss", text: "Dismiss" } as ToastAction

    // Act
    render(
      <Toast
        id={1}
        message="Hello Toast!"
        action={action}
        onDismiss={onDismiss}
      />,
    )

    const button = screen.getByText(action.text)

    await userEvent.click(button)

    // Assert
    expect(onDismiss).toHaveBeenCalled()
  })
})
