import { act, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { placements } from "./placements"
import { Tooltip } from "./Tooltip"

describe("Tooltip", () => {
  it("displays tooltip onMouseEnter", async () => {
    // ArrTestId
    const children = "Hello"
    const label = "World"
    const testId = "tooltip"

    // Act
    render(<Tooltip label={label}>{children}</Tooltip>)

    const receivedChild = screen.getByText(children)

    expect(screen.queryByTestId(testId)).not.toBeInTheDocument()

    await userEvent.hover(receivedChild)

    // Assert
    expect(screen.getByTestId(testId)).toBeInTheDocument()
  })

  it("hides tooltip onMouseLeave", async () => {
    // Arrange
    const children = "Hello"
    const label = "World"
    const testId = "tooltip"

    // Act
    render(<Tooltip label={label}>{children}</Tooltip>)

    const receivedChild = screen.getByText(children)

    await userEvent.hover(receivedChild)

    expect(screen.getByTestId(testId)).toBeInTheDocument()

    await userEvent.unhover(receivedChild)

    // Assert
    await waitFor(() =>
      expect(screen.queryByTestId(testId)).not.toBeInTheDocument(),
    )
  })

  it("can be focused and escaped by keyboard events", async () => {
    // Arrange
    const children = "Hello"
    const label = "World"
    const testId = "tooltip"

    // Act
    render(<Tooltip label={label}>{children}</Tooltip>)

    // Assert
    await userEvent.tab()

    expect(screen.queryByTestId(testId)).not.toBeInTheDocument()

    await userEvent.keyboard("[Enter]")

    expect(screen.getByTestId(testId)).toBeInTheDocument()

    await userEvent.keyboard("[Escape]")

    await waitFor(() =>
      expect(screen.queryByTestId(testId)).not.toBeInTheDocument(),
    )
  })

  it("can be dismissed by clicking anchor element", async () => {
    // Arrange
    const children = "Hello"
    const label = "World"
    const testId = "tooltip"

    // Act
    render(
      <Tooltip hideOnClick label={label}>
        {children}
      </Tooltip>,
    )

    const receivedChildren = screen.getByText(children)

    // Assert
    await userEvent.hover(receivedChildren)

    expect(screen.getByTestId(testId)).toBeInTheDocument()

    await userEvent.click(receivedChildren)

    await waitFor(() =>
      expect(screen.queryByTestId(testId)).not.toBeInTheDocument(),
    )
  })

  it("can always be shown", async () => {
    // Arrange
    const children = "Hello"
    const label = "World"
    const testId = "tooltip"

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

    expect(screen.getByTestId(testId)).toBeInTheDocument()

    await userEvent.hover(receivedChildren)

    await userEvent.unhover(receivedChildren)

    expect(screen.getByTestId(testId)).toBeInTheDocument()
  })

  /* 
  We are making this async since this component internally sets state within a ref callback,
  otherwise testing library complains about state being set and not wrapping fireEvent in 'act' 
  */
  it("can display an optional arrow element", async () => {
    // Arrange
    const children = "Hello"
    const label = "World"
    const arrowTestId = "tooltip_arrow"

    // Act
    render(
      <Tooltip alwaysShow showArrow label={label}>
        {children}
      </Tooltip>,
    )

    const received = screen.getByTestId(arrowTestId)

    // Assert
    await waitFor(() => expect(received).toBeInTheDocument())
  })

  it("allows for an enterDelay or exitDelay to be set", async () => {
    // Arrange
    jest.useFakeTimers()
    /*
      when using fake timers we have to set delay to null, 
      otherwise the userEvent never resolves
    */
    const user = userEvent.setup({ delay: null })
    const children = "Hello"
    const label = "World"
    const testId = "tooltip"
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
    await user.hover(receivedChildren)

    expect(screen.queryByTestId(testId)).not.toBeInTheDocument()

    act(() => {
      jest.advanceTimersByTime(enterDelay)
    })

    await screen.findByTestId(testId)

    await user.unhover(receivedChildren)

    expect(screen.getByTestId(testId)).toBeInTheDocument()

    act(() => {
      jest.advanceTimersByTime(exitDelay)
    })

    await waitFor(() =>
      expect(screen.queryByTestId(testId)).not.toBeInTheDocument(),
    )

    jest.useRealTimers()
  })

  it("supports aria-describedby", async () => {
    // Arrange
    const ariaDescribedBy = "paragraphtext"
    const children = <b>paragraph</b>
    const spanTestId = "tooltip_span"
    const testId = "tooltip"
    const label =
      "a distinct section of a piece of writing, usually dealing with a single theme and indicated by a new line, indentation, or numbering."

    // Act
    render(
      <p>
        This is a tooltip that lives within a{" "}
        <Tooltip label={label} aria-describedby={ariaDescribedBy}>
          {children}
        </Tooltip>
        . Tooltips can be very handy for communicating additional information
        within a body of text :).
      </p>,
    )

    const receivedWrapper = screen.getByTestId(spanTestId)

    await userEvent.hover(receivedWrapper)

    const receivedTooltip = screen.getByTestId(testId)

    // Assert
    expect(receivedWrapper).toHaveAttribute("aria-describedby", ariaDescribedBy)
    expect(receivedTooltip.id).toEqual(ariaDescribedBy)
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
