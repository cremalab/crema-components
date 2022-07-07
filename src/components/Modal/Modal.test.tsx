import { act, render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Modal } from "./Modal"

describe("Modal", () => {
  it("renders nothing when open = false", async () => {
    // Arrange
    // Act
    const { asFragment } = await render(
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
    const { findByText } = await render(
      <Modal open={true} title={title}>
        {children}
      </Modal>,
    )
    const titleNode = await findByText(title)
    const childrenNode = await findByText(children)

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
    const { findByTestId } = await render(
      <Modal open={true} title={title} onClose={onClose}>
        {children}
      </Modal>,
    )
    const overlay = await findByTestId("modal-overlay")
    await act(async () => userEvent.click(overlay))

    expect(onClose).toHaveBeenCalled()
  })

  it("calls onClose when the escape key is pressed", async () => {
    // Arrange
    const onClose = jest.fn()
    const title = "title"
    const children = "children"

    // Act
    await render(
      <Modal open={true} title={title} onClose={onClose}>
        {children}
      </Modal>,
    )

    userEvent.keyboard("[Escape]")

    expect(onClose).toHaveBeenCalled()
  })
})
