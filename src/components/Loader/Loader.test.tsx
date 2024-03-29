import { act, render, screen } from "@testing-library/react"
import { DefaultSpinner } from "./DefaultSpinner"
import { Loader } from "./Loader"

describe("Loader", () => {
  it("renders nothing before the timeout", () => {
    // Arrange
    const text = "Loading"
    const timeout = 1000

    jest.useFakeTimers()

    // Act
    render(<Loader timeout={timeout}>{text}</Loader>)

    act(() => {
      jest.advanceTimersByTime(timeout / 2)
    })

    const received = screen.queryByText(text)

    // Assert
    expect(received).toBeNull()
  })

  it("renders the expected content after the timeout", () => {
    // Arrange
    const text = "Loading"
    const ariaLabel = "Now loading please wait"
    const timeout = 1000

    jest.useFakeTimers()

    // Act
    render(
      <Loader timeout={timeout} ariaLabel={ariaLabel}>
        {text}
      </Loader>,
    )

    act(() => {
      jest.advanceTimersByTime(timeout)
    })

    const received = screen.queryByLabelText(ariaLabel)

    // Assert
    expect(received).toBeInTheDocument()
    expect(received).toHaveTextContent(text)
  })

  it("renders instantly if the timeout is 0", () => {
    // Arrange
    const text = "Loading"
    const ariaLabel = "Now loading please wait"
    const timeout = 0

    jest.useFakeTimers()

    // Act
    render(
      <Loader timeout={timeout} ariaLabel={ariaLabel}>
        {text}
      </Loader>,
    )

    const received = screen.queryByLabelText(ariaLabel)

    // Assert
    expect(received).toBeInTheDocument()
    expect(received).toHaveTextContent(text)
  })

  it("renders the expected structure with default props", () => {
    // Arrange
    jest.useFakeTimers()

    // Act
    render(<Loader />)

    act(() => {
      jest.advanceTimersByTime(200)
    })

    const received = screen.queryByLabelText("Loading now please wait")

    // Assert
    expect(received).toBeInTheDocument()
  })
})

describe("DefaultSpinner", () => {
  it("renders the expected structure with size = small", () => {
    // Arrange
    const size = "small"

    // Act
    render(<DefaultSpinner size={size} />)

    const spinner = screen.getByTestId("spinner")

    // Assert
    expect(spinner).toHaveClass("DefaultSpinner", size)
  })

  it("renders the expected structure with size = medium", () => {
    // Arrange
    const size = "medium"

    // Act
    render(<DefaultSpinner size={size} />)

    const spinner = screen.getByTestId("spinner")

    // Assert
    expect(spinner).toHaveClass("DefaultSpinner", size)
  })

  it("renders the expected structure with size = large", () => {
    // Arrange
    const size = "large"

    // Act
    render(<DefaultSpinner size={size} />)

    const spinner = screen.getByTestId("spinner")

    // Assert
    expect(spinner).toHaveClass("DefaultSpinner", size)
  })

  it("renders the expected structure with no default props", () => {
    // Arrange

    // Act
    render(<DefaultSpinner />)

    const spinner = screen.getByTestId("spinner")

    // Assert
    expect(spinner).toHaveClass("DefaultSpinner", "medium")
  })
})
