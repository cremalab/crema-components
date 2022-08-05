import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Tooltip } from "./Tooltip"

describe("Tooltip", () => {
  it("displays tooltip onMouseEnter", async () => {
    // Arrange
    const children = "Hello"
    const label = "World"

    // Act
    render(<Tooltip label={label}>{children}</Tooltip>)

    const receivedChild = screen.getByText(children)

    expect(screen.getByText(label)).not.toBeVisible()

    await userEvent.hover(receivedChild)

    // Assert
    expect(screen.getByText(label)).toBeVisible()
  })
  it("hides tooltip onMouseLeave", async () => {
    // Arrange
    const children = "Hello"
    const label = "World"

    // Act
    render(<Tooltip label={label}>{children}</Tooltip>)

    const receivedChild = screen.getByText(children)

    await userEvent.hover(receivedChild)

    expect(screen.getByText(label)).toBeVisible()

    await userEvent.unhover(receivedChild)

    // Assert
    expect(screen.getByText(label)).not.toBeVisible()
  })
})
