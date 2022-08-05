import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { placements } from "./placements"
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
  it("can be focused and escaped by keyboard events", async () => {
    // Arrange
    const children = "Hello"
    const label = "World"

    // Act
    render(<Tooltip label={label}>{children}</Tooltip>)

    // Assert
    await userEvent.tab()

    expect(screen.getByText(label)).not.toBeVisible()

    await userEvent.keyboard("[Enter]")

    expect(screen.getByText(label)).toBeVisible()

    await userEvent.keyboard("[Escape]")

    expect(screen.getByText(label)).not.toBeVisible()
  })
  it("can be dismissed by clicking anchor element", async () => {
    // Arrange
    const children = "Hello"
    const label = "World"

    // Act
    render(
      <Tooltip hideOnClick label={label}>
        {children}
      </Tooltip>,
    )

    const receivedChildren = screen.getByText(children)

    // Assert
    await userEvent.hover(receivedChildren)

    expect(screen.getByText(label)).toBeVisible()

    await userEvent.click(receivedChildren)

    expect(screen.getByText(label)).not.toBeVisible()
  })
  it("can always be shown", async () => {
    // Arrange
    const children = "Hello"
    const label = "World"

    // Act
    render(
      <Tooltip alwaysShow label={label}>
        {children}
      </Tooltip>,
    )

    const receivedChildren = screen.getByText(children)

    // Assert
    await userEvent.tab()

    await userEvent.keyboard("[Escape]")

    expect(screen.getByText(label)).toBeVisible()

    await userEvent.hover(receivedChildren)

    await userEvent.unhover(receivedChildren)

    expect(screen.getByText(label)).toBeVisible()
  })
  /* 
  We are making this async since this component internally sets state within a ref callback,
  otherwise testing library complains about state being set and not wrapping fireEvent in 'act' 
  */
  it("can display an optional arrow element", async () => {
    // Arrange
    const children = "Hello"
    const label = "World"
    const arrowTestID = "tooltip_arrow"

    // Act
    render(
      <Tooltip showArrow label={label}>
        {children}
      </Tooltip>,
    )

    const received = screen.getByTestId(arrowTestID)

    // Assert
    await waitFor(() => expect(received).toBeInTheDocument())
  })
  it("allows for an enterDelay or exitDelay to be set", async () => {
    // Arrange
    const children = "Hello"
    const label = "World"
    const enterDelay = 300
    const exitDelay = 500

    // Act
    render(
      <Tooltip enterDelay={enterDelay} exitDelay={exitDelay} label={label}>
        {children}
      </Tooltip>,
    )

    const receivedChildren = screen.getByText(children)

    // Assert
    await userEvent.hover(receivedChildren)

    expect(screen.getByText(label)).not.toBeVisible()

    await waitFor(() => expect(screen.getByText(label)).toBeVisible(), {
      timeout: enterDelay,
    })

    await userEvent.unhover(receivedChildren)

    expect(screen.getByText(label)).toBeVisible()

    await waitFor(() => expect(screen.getByText(label)).not.toBeVisible(), {
      timeout: exitDelay,
    })
  })
  it("allows for custom placement", () => {
    placements.forEach(async (placement) => {
      // Act
      const children = "Hello" + placement
      const label = "World"
      // Act
      render(
        <Tooltip placement={placement} label={label}>
          {children}
        </Tooltip>,
      )

      const receivedChildren = screen.getByText(children)

      await userEvent.hover(receivedChildren)

      // Assert
      expect(receivedChildren).toHaveAttribute(
        "data-popper-placement",
        placement,
      )
    })
  })
})
