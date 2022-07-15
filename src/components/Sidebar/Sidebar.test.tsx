import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Sidebar } from "./Sidebar"
import { SidebarTitle } from "./SidebarTitle"

describe("Sidebar", () => {
  it("renders nothing when open = false", async () => {
    // Arrange
    // Act
    const { asFragment } = render(
      <Sidebar open={false}>this should not render</Sidebar>,
    )

    // Assert
    expect(asFragment()).toMatchSnapshot()
  })

  it("renders content when open = true", async () => {
    // Arrange
    const title = "title"
    const children = "children"

    // Act
    const { findByText } = render(
      <Sidebar open={true} title={title}>
        {children}
      </Sidebar>,
    )
    const titleNode = await findByText(title)
    const childrenNode = await findByText(children)

    // Assert
    expect(titleNode).toBeInTheDocument()
    expect(childrenNode).toBeInTheDocument()
  })

  it("calls onClose when the sidebar overlay is clicked", async () => {
    // Arrange
    const onClose = jest.fn()
    const title = "title"
    const children = "children"

    // Act
    const { findByTestId } = render(
      <Sidebar open={true} title={title} onClose={onClose} hideOverlay={false}>
        {children}
      </Sidebar>,
    )
    const overlay = await findByTestId("sidebar-backdrop")
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
      <Sidebar open={true} title={title} onClose={onClose}>
        {children}
      </Sidebar>,
    )
    await userEvent.keyboard("[Escape]")

    expect(onClose).toHaveBeenCalled()
  })

  it("does not call onClose when the sidebar is not open and the escape key is pressed", async () => {
    // Arrange
    const onClose = jest.fn()
    const title = "title"
    const children = "children"

    // Act
    render(
      <Sidebar open={false} title={title} onClose={onClose}>
        {children}
      </Sidebar>,
    )
    await userEvent.keyboard("[Escape]")

    expect(onClose).not.toHaveBeenCalled()
  })

  it("does not render a title when title is not provided", async () => {
    // Arrange
    const children = "children"

    // Act
    const { queryByText } = render(<Sidebar open={true}>{children}</Sidebar>)

    // Assert
    expect(queryByText(children)).toBeInTheDocument()
  })
})

describe("SidebarTitle", () => {
  it("renders the children", async () => {
    // Arrange
    // Act
    const { findByText } = render(<SidebarTitle>Test Title</SidebarTitle>)
    const received = await findByText("Test Title")

    // Assert
    expect(received).toBeInTheDocument()
  })

  it("does not render the close button if no onClose is given", async () => {
    // Arrange
    // Act
    const { queryByLabelText } = render(<SidebarTitle>Test Title</SidebarTitle>)

    const closeButton = queryByLabelText("close the sidebar")

    // Assert
    expect(closeButton).toBeNull()
  })

  it("calls onClose when the close button is clicked", async () => {
    // Arrange
    const onClose = jest.fn()

    // Act
    const { queryByLabelText } = render(
      <SidebarTitle onClose={onClose}>Test Title</SidebarTitle>,
    )

    const closeButton = queryByLabelText("close the sidebar") as HTMLElement
    await userEvent.click(closeButton)

    // Assert
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it("renders children in a paragraph tag if children is a string", async () => {
    // Arrange
    const children = "Test Title"
    // Act
    const { findByText } = render(<SidebarTitle>{children}</SidebarTitle>)
    const received = await findByText("Test Title")

    // Assert
    expect(received).toBeInTheDocument()
    expect(received.tagName).toBe("P")
  })

  it("renders children in a div tag if children is not a string", async () => {
    // Arrange
    const children = <div>Test Title</div>
    // Act
    const { findByText } = render(<SidebarTitle>{children}</SidebarTitle>)
    const received = await findByText("Test Title")

    // Assert
    expect(received).toBeInTheDocument()
    expect(received.tagName).toBe("DIV")
  })
})
