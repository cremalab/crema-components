import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Chip } from "./Chip"

describe("Chip", () => {
  it("renders the expected structure with no default props", () => {
    // Arrange
    const children = "Test Chip"

    // Act
    render(<Chip>{children}</Chip>)

    const chipSelectElement = screen.getByText(children)
    const closeElement = screen.queryByLabelText("close")

    // Assert
    expect(chipSelectElement).toBeInTheDocument()
    expect(closeElement).toBeNull()
  })

  it("calls onClose when the closeElement is pressed", async () => {
    // Arrange
    const children = "Test Chip"
    const closeElement = <>Close</>
    const onClose = jest.fn()

    // Act
    render(
      <Chip onClose={onClose} closeElement={closeElement}>
        {children}
      </Chip>,
    )

    const receivedCloseElement = screen.getByLabelText("close")
    await userEvent.click(receivedCloseElement)

    // Assert
    expect(receivedCloseElement).toBeInTheDocument()
    expect(receivedCloseElement).toHaveTextContent("Close")
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it("calls onSelect when the main element is clicked", async () => {
    // Arrange
    const children = "Test Chip"
    const onSelect = jest.fn()

    // Act
    render(<Chip onSelect={onSelect}>{children}</Chip>)

    const received = screen.getByText(children)
    await userEvent.click(received)

    // Assert
    expect(received).toBeInTheDocument()
    expect(onSelect).toHaveBeenCalledTimes(1)
  })

  it("calls onSelect when the main element is tabbed to and then enter is pressed", async () => {
    // Arrange
    const children = "Test Chip"
    const onSelect = jest.fn()

    // Act
    render(<Chip onSelect={onSelect}>{children}</Chip>)

    const received = screen.getByText(children)
    await userEvent.tab()
    await userEvent.keyboard("{enter}")

    // Assert
    expect(received).toBeInTheDocument()
    expect(onSelect).toHaveBeenCalledTimes(1)
  })

  it("does not call onSelect when the main element is tabbed to and then any other key is pressed", async () => {
    // Arrange
    const children = "Test Chip"
    const onSelect = jest.fn()

    // Act
    render(<Chip onSelect={onSelect}>{children}</Chip>)

    const received = screen.getByText(children)
    await userEvent.tab()
    await userEvent.keyboard("{space}")

    // Assert
    expect(received).toBeInTheDocument()
    expect(onSelect).toHaveBeenCalledTimes(0)
  })

  it("calls onClose when the close element is tabbed to and then enter is pressed", async () => {
    // Arrange
    const children = "Test Chip"
    const closeElement = <>Close</>
    const onClose = jest.fn()

    // Act
    render(
      <Chip onClose={onClose} closeElement={closeElement}>
        {children}
      </Chip>,
    )

    const receivedCloseElement = screen.getByLabelText("close")
    await userEvent.tab()
    await userEvent.keyboard("{enter}")

    // Assert
    expect(receivedCloseElement).toBeInTheDocument()
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it("does not call onClose when the close element is tabbed to and then any other key is pressed", async () => {
    // Arrange
    const children = "Test Chip"
    const closeElement = <>Close</>
    const onClose = jest.fn()

    // Act
    render(
      <Chip onClose={onClose} closeElement={closeElement}>
        {children}
      </Chip>,
    )

    const receivedCloseElement = screen.getByLabelText("close")
    await userEvent.tab()
    await userEvent.keyboard("{space}")

    // Assert
    expect(receivedCloseElement).toBeInTheDocument()
    expect(onClose).toHaveBeenCalledTimes(0)
  })
})
