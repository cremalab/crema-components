import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { act } from "react-dom/test-utils"
import { SearchInput } from "./SearchInput"

describe("SearchInput", () => {
  it("renders search icon", () => {
    // Arrange
    const searchIconTestId = "search_icon"

    // Act
    render(<SearchInput onDebounce={jest.fn()} />)

    const receivedIcon = screen.getByTestId(searchIconTestId)

    // Assert
    expect(receivedIcon).toBeInTheDocument()
  })
  it("clear icon is not visible if search term is empty", () => {
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
    const clearIconlabel = "click icon to clear search"
    const text = "Hello World"

    // Act
    render(<SearchInput aria-label={inputLabel} onDebounce={jest.fn()} />)

    const input = screen.getByLabelText<HTMLInputElement>(inputLabel)

    const clearIcon = screen.getByLabelText(clearIconlabel)

    await userEvent.type(input, text)

    expect(input.value).toBe(text)

    await userEvent.click(clearIcon)

    // Assert
    expect(input.value).toBe("")
  })
  it("renders custom start icon and end icon", () => {
    // Arrange
    const searchIconLabel = "a pumpkin"
    const clearIconLabel = "clear input"
    const searchIcon = <span aria-label={searchIconLabel}>🎃</span>
    const clearIcon = <span aria-label={clearIconLabel}>✖️</span>

    // Act
    render(
      <SearchInput
        onDebounce={jest.fn()}
        searchIcon={searchIcon}
        clearIcon={clearIcon}
      />,
    )

    const receivedsearchIcon = screen.getByLabelText(searchIconLabel)

    const receivedclearIcon = screen.getByLabelText(clearIconLabel)

    // Assert
    expect(receivedsearchIcon).toBeInTheDocument()
    expect(receivedclearIcon).toBeInTheDocument()
  })
  it("renders a search button if onSearchClick function is passed", async () => {
    // Arrange
    const onSearchClick = jest.fn()
    const label = "click to search"

    // Act
    render(<SearchInput onSearchClick={onSearchClick} />)

    const button = screen.getByLabelText(label)

    await userEvent.click(button)

    // Assert
    expect(onSearchClick).toBeCalled()
  })
})
