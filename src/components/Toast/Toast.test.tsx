import { render, screen } from "@testing-library/react"
import { Button } from "../Button"
import { Status } from "./types"
import { Toast } from "./Toast"

describe("Toast", () => {
  it("has an aria-live value of 'assertive' if type is 'error'", () => {
    // Arrange
    const status = "error"

    // Act
    render(<Toast status={status} message="Hello Toast!" />)

    const received = screen.getByRole("alert")

    // Assert
    expect(received).toHaveAttribute("aria-live", "assertive")
  })
  it("has an aria-live value of 'polite' if not type of 'error'", () => {
    // Arrange
    const status = "success"
    // Act

    render(<Toast status={status} message="Hello Toast!" />)

    const received = screen.getByRole("alert")

    // Assert
    expect(received).toHaveAttribute("aria-live", "polite")
  })
  it("renders toast for each type", () => {
    const statuses = ["success", "error", "warning", "info"] as Status[]
    statuses.forEach((status) => {
      // Arrange
      const message = "Hello Toast!"
      const label = `a ${status} toast`

      // Act
      render(<Toast status={status} message={message} />)

      const received = screen.getByLabelText(label)

      // Assert
      expect(received).toHaveAttribute("data-type", status)
    })
  })
  it("renders an action element", () => {
    // Arrange
    const actionLabel = "dismiss toast"
    const action = <Button ariaLabel={actionLabel}>Dismiss</Button>

    // Act
    render(<Toast message="Hello Toast!" action={action} />)

    const received = screen.getByLabelText(actionLabel)

    // Assert
    expect(received).toBeInTheDocument()
  })
})
