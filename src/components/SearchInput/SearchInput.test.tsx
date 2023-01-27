import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { act } from "react-dom/test-utils"
import { SearchInput } from "./SearchInput"

const userWithoutDelay = userEvent.setup({ delay: null })

describe("SearchInput", () => {
  it("renders search icon", () => {
    // Arrange
    const searchIconTestId = "search_icon"

    // Act
    render(<SearchInput aria-label="search" onSearch={jest.fn()} />)

    const receivedIcon = screen.getByTestId(searchIconTestId)

    // Assert
    expect(receivedIcon).toBeInTheDocument()
  })

  it("clear icon is not visible if search term is empty", () => {
    // Arrange
    const label = "click icon to clear search"

    // Act
    render(<SearchInput aria-label="search" onSearch={jest.fn()} />)

    const receivedIcon = screen.getByLabelText(label)

    // Assert
    expect(receivedIcon).toHaveClass("hidden")
  })

  it("debounces and invokes a callback", async () => {
    // Arrange
    jest.useFakeTimers()
    const onSearch = jest.fn()
    const label = "search"
    const text = "hello world"
    const debounceDelay = 600

    // Act
    render(
      <SearchInput
        aria-label={label}
        onSearch={onSearch}
        debounceDelay={debounceDelay}
      />,
    )

    const input = screen.getByLabelText(label)

    await userWithoutDelay.type(input, text)

    act(() => {
      jest.advanceTimersByTime(debounceDelay)
    })

    // Assert
    expect(onSearch).toHaveBeenCalled()
    expect(onSearch).toHaveBeenCalledWith(text)
    jest.useRealTimers()
  })

  it("has a default delay of 300", async () => {
    // Arrange
    jest.useFakeTimers()
    const onSearch = jest.fn()
    const label = "search"
    const text = "hello world"

    // Act
    render(<SearchInput aria-label={label} onSearch={onSearch} />)

    const input = screen.getByLabelText(label)

    await userWithoutDelay.type(input, text)

    act(() => {
      jest.advanceTimersByTime(300)
    })

    // Assert
    expect(onSearch).toHaveBeenCalled()
    jest.useRealTimers()
  })

  it("clears the input when the clear icon is clicked", async () => {
    // Arrange
    const inputLabel = "search"
    const clearIconlabel = "click icon to clear search"
    const text = "Hello World"

    // Act
    render(<SearchInput aria-label={inputLabel} onSearch={jest.fn()} />)

    const input = screen.getByLabelText<HTMLInputElement>(inputLabel)

    const clearIcon = screen.getByLabelText(clearIconlabel)

    await userEvent.type(input, text)

    expect(input.value).toBe(text)

    await userEvent.click(clearIcon)

    // Assert
    expect(input.value).toBe("")
  })

  it("renders custom search icon and clear icon", () => {
    // Arrange
    const searchIconLabel = "a pumpkin"
    const clearIconLabel = "clear input"
    const searchIcon = <span aria-label={searchIconLabel}>🎃</span>
    const clearIcon = <span aria-label={clearIconLabel}>✖️</span>

    // Act
    render(
      <SearchInput
        aria-label="search"
        onSearch={jest.fn()}
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

  it("renders a search button if showSearchButton is true", async () => {
    // Arrange
    const searchButtonLabel = "click to search"

    // Act
    render(
      <SearchInput onSearch={jest.fn()} aria-label="search" showSearchButton />,
    )

    const button = screen.getByLabelText(searchButtonLabel)

    // Assert
    expect(button).toBeInTheDocument()
  })

  it("invokes 'onSearch' only when search button is clicked when showSearchButton = 'true'", async () => {
    // Arrange
    jest.useFakeTimers()
    const onSearch = jest.fn()
    const text = "Hello World"
    const inputLabel = "search"
    const searchButtonLabel = "click to search"

    // Act
    render(
      <SearchInput
        showSearchButton
        aria-label={inputLabel}
        onSearch={onSearch}
      />,
    )

    const input = screen.getByLabelText(inputLabel)
    const button = screen.getByLabelText(searchButtonLabel)

    await userWithoutDelay.type(input, text)
    await userWithoutDelay.click(button)

    act(() => {
      jest.advanceTimersByTime(300)
    })

    // Assert
    expect(onSearch).toHaveBeenCalledTimes(1)
    expect(onSearch).toHaveBeenCalledWith(text)
    jest.useRealTimers()
  })

  it("invokes 'onBlur' and 'onFocus'", async () => {
    // Arrange
    const onBlur = jest.fn()
    const onFocus = jest.fn()
    const label = "search"

    // Act
    render(
      <SearchInput
        onSearch={jest.fn()}
        aria-label={label}
        onBlur={onBlur}
        onFocus={onFocus}
      />,
    )

    const received = screen.getByLabelText(label)

    // Assert
    await userEvent.click(received)
    expect(onFocus).toHaveBeenCalled()

    await userEvent.tab()
    expect(onBlur).toHaveBeenCalled()
  })

  it("shows clear button on focus when value is defined and hides when blurred", async () => {
    // Arrange
    const clearButtonLabel = "click icon to clear search"
    const inputLabel = "search"
    const text = "Hello World"

    // Act
    render(<SearchInput onSearch={jest.fn()} aria-label={inputLabel} />)

    const input = screen.getByLabelText(inputLabel)
    const button = screen.getByLabelText(clearButtonLabel)

    // Assert
    await userEvent.click(input)
    expect(button).toHaveClass("hidden")
    await userEvent.type(input, text)
    expect(button).not.toHaveClass("hidden")
    await userEvent.tab()
    expect(button).toHaveClass("hidden")
  })

  it("invokes onSearch when enter is pressed", async () => {
    // Arrange
    jest.useFakeTimers()
    const onSearch = jest.fn()
    const text = "hello world"

    // Act
    render(
      <SearchInput
        initialValue={text}
        aria-label="search"
        onSearch={onSearch}
      />,
    )

    await userWithoutDelay.keyboard("[Enter]")

    act(() => {
      jest.advanceTimersByTime(300)
    })

    // Assert
    expect(onSearch).toHaveBeenCalledTimes(1)
    expect(onSearch).toHaveBeenCalledWith(text)
    jest.useRealTimers()
  })
})
