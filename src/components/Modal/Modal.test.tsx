import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Modal } from "./Modal"
import { ModalTitle } from "./ModalTitle"

describe("Modal", () => {
  it("renders nothing when open = false", async () => {
    // Arrange
    // Act
    const { asFragment } = render(
      <Modal open={false}>this should not render</Modal>,
    )

    // Assert
    expect(asFragment()).toMatchSnapshot()
  })

  it("renders content when open = true", async () => {
    // Arrange
    const title = "title"
    const children = "children"

    // Act
    render(
      <Modal open={true} title={title}>
        {children}
      </Modal>,
    )

    const titleNode = await screen.findByText(title)
    const childrenNode = await screen.findByText(children)

    // Assert
    expect(titleNode).toBeInTheDocument()
    expect(childrenNode).toBeInTheDocument()
  })

  it("calls onClose when the modal overlay is clicked", async () => {
    // Arrange
    const onClose = jest.fn()
    const title = "title"
    const children = "children"

    // Act
    render(
      <Modal open={true} title={title} onClose={onClose}>
        {children}
      </Modal>,
    )

    const overlay = await screen.findByTestId("modal-overlay")
    await userEvent.click(overlay)

    expect(onClose).toHaveBeenCalled()
  })

  it("calls onClose when the escape key is pressed", async () => {
    // Arrange
    const onClose = jest.fn()
    const title = "title"
    const children = "children"

    // Act
    render(
      <Modal open={true} title={title} onClose={onClose}>
        {children}
      </Modal>,
    )

    await userEvent.keyboard("[Escape]")

    expect(onClose).toHaveBeenCalled()
  })

  it("does not call onClose when the modal is not open and the escape key is pressed", async () => {
    // Arrange
    const onClose = jest.fn()
    const title = "title"
    const children = "children"

    // Act
    render(
      <Modal open={false} title={title} onClose={onClose}>
        {children}
      </Modal>,
    )

    await userEvent.keyboard("[Escape]")

    expect(onClose).not.toHaveBeenCalled()
  })

  it("does not render a title if no title is provided", async () => {
    // Arrange
    const children = "children"

    // Act
    render(<Modal open={true}>{children}</Modal>)

    // Assert
    expect(screen.getByText(children)).toBeInTheDocument()
  })
})

describe("ModalTitle", () => {
  it("renders the children", async () => {
    // Arrange
    // Act
    render(<ModalTitle>Test Title</ModalTitle>)
    const received = await screen.findByText("Test Title")

    // Assert
    expect(received).toBeInTheDocument()
  })

  it("does not render the close button if no onClose is given", async () => {
    // Arrange
    // Act
    render(<ModalTitle>Test Title</ModalTitle>)
    const closeButton = screen.queryByLabelText("close the modal")

    // Assert
    expect(closeButton).toBeNull()
  })

  it("calls onClose when the close button is clicked", async () => {
    // Arrange
    const onClose = jest.fn()

    // Act
    render(<ModalTitle onClose={onClose}>Test Title</ModalTitle>)

    const closeButton = screen.queryByLabelText(
      "close the modal",
    ) as HTMLElement
    await userEvent.click(closeButton)

    // Assert
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it("renders children in a paragraph tag if children is a string", async () => {
    // Arrange
    const children = "Test Title"
    // Act
    render(<ModalTitle>{children}</ModalTitle>)
    const received = await screen.findByText("Test Title")

    // Assert
    expect(received).toBeInTheDocument()
    expect(received.tagName).toBe("P")
  })

  it("renders children in a div tag if children is not a string", async () => {
    // Arrange
    const children = <div>Test Title</div>
    // Act
    render(<ModalTitle>{children}</ModalTitle>)
    const received = await screen.findByText("Test Title")

    // Assert
    expect(received).toBeInTheDocument()
    expect(received.tagName).toBe("DIV")
  })
})
