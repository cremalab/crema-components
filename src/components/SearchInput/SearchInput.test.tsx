import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { act } from "react-dom/test-utils"
import { SearchInput } from "./SearchInput"

describe("SearchInput", () => {
  it("renders start icon", () => {
    // Arrange
    const startIconTestId = "start_icon"

    // Act
    render(<SearchInput onDebounce={jest.fn()} />)

    const receivedIcon = screen.getByTestId(startIconTestId)

    // Assert
    expect(receivedIcon).toBeInTheDocument()
  })
  it("end icon is not visible if search term is empty", () => {
    // Arrange
    const label = "click icon to clear search"

    // Act
    render(<SearchInput onDebounce={jest.fn()} />)

    const receivedIcon = screen.getByLabelText(label)

    // Assert
    expect(receivedIcon).not.toBeVisible()
  })
  it("debounces and invokes a callback", async () => {
    // Arrange
    jest.useFakeTimers()
    const user = userEvent.setup({ delay: null })
    const onDebounce = jest.fn()
    const label = "search"
    const text = "hello world"
    const debounceDelay = 600

    // Act
    render(
      <SearchInput
        aria-label={label}
        onDebounce={onDebounce}
        debounceDelay={debounceDelay}
      />,
    )

    const input = screen.getByLabelText(label)

    await user.type(input, text)

    act(() => {
      jest.advanceTimersByTime(debounceDelay)
    })

    // Assert
    await waitFor(() => expect(onDebounce).toBeCalled())
    jest.useRealTimers()
  })
  it("has a default delay of 300", async () => {
    // Arrange
    jest.useFakeTimers()
    const user = userEvent.setup({ delay: null })
    const onDebounce = jest.fn()
    const label = "search"
    const text = "hello world"

    // Act
    render(<SearchInput aria-label={label} onDebounce={onDebounce} />)

    const input = screen.getByLabelText(label)

    await user.type(input, text)

    act(() => {
      jest.advanceTimersByTime(300)
    })

    // Assert
    await waitFor(() => expect(onDebounce).toBeCalled())
    jest.useRealTimers()
  })
  it("clears the input when the end icon is clicked", async () => {
    // Arrange
    const inputLabel = "search"
    const endIconlabel = "click icon to clear search"
    const text = "Hello World"

    // Act
    render(<SearchInput aria-label={inputLabel} onDebounce={jest.fn()} />)

    const input = screen.getByLabelText<HTMLInputElement>(inputLabel)

    const endIcon = screen.getByLabelText(endIconlabel)

    await userEvent.type(input, text)

    expect(input.value).toBe(text)

    await userEvent.click(endIcon)

    // Assert
    expect(input.value).toBe("")
  })
  it("renders custom start icon and end icon", () => {
    // Arrange
    const startIconLabel = "a pumpkin"
    const endIconLabel = "clear input"
    const startIcon = <span aria-label={startIconLabel}>🎃</span>
    const endIcon = <span aria-label={endIconLabel}>✖️</span>

    // Act
    render(
      <SearchInput
        onDebounce={jest.fn()}
        startIcon={startIcon}
        endIcon={endIcon}
      />,
    )

    const receivedStartIcon = screen.getByLabelText(startIconLabel)

    const receivedEndIcon = screen.getByLabelText(endIconLabel)

    // Assert
    expect(receivedStartIcon).toBeInTheDocument()
    expect(receivedEndIcon).toBeInTheDocument()
  })
})
