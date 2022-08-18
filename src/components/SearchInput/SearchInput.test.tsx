import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { act } from "react-dom/test-utils"
import { SearchInput } from "./SearchInput"

describe("SearchInput", () => {
  it("renders search icon", () => {
    // Arrange
    const searchIconTestId = "search_icon"

    // Act
    render(<SearchInput ariaLabel="search" onSearch={jest.fn()} />)

    const receivedIcon = screen.getByTestId(searchIconTestId)

    // Assert
    expect(receivedIcon).toBeInTheDocument()
  })
  it("clear icon is not visible if search term is empty", () => {
    // Arrange
    const label = "click icon to clear search"

    // Act
    render(<SearchInput ariaLabel="search" onSearch={jest.fn()} />)

    const receivedIcon = screen.getByLabelText(label)

    // Assert
    expect(receivedIcon).not.toBeVisible()
  })
  it("debounces and invokes a callback", async () => {
    // Arrange
    jest.useFakeTimers()
    const user = userEvent.setup({ delay: null })
    const onSearch = jest.fn()
    const label = "search"
    const text = "hello world"
    const debounceDelay = 600

    // Act
    render(
      <SearchInput
        ariaLabel={label}
        onSearch={onSearch}
        debounceDelay={debounceDelay}
      />,
    )

    const input = screen.getByLabelText(label)

    await user.type(input, text)

    act(() => {
      jest.advanceTimersByTime(debounceDelay)
    })

    // Assert
    expect(onSearch).toBeCalled()
    expect(onSearch).toBeCalledWith(text)
    jest.useRealTimers()
  })
  it("has a default delay of 300", async () => {
    // Arrange
    jest.useFakeTimers()
    const user = userEvent.setup({ delay: null })
    const onSearch = jest.fn()
    const label = "search"
    const text = "hello world"

    // Act
    render(<SearchInput ariaLabel={label} onSearch={onSearch} />)

    const input = screen.getByLabelText(label)

    await user.type(input, text)

    act(() => {
      jest.advanceTimersByTime(300)
    })

    // Assert
    expect(onSearch).toBeCalled()
    jest.useRealTimers()
  })
  it("clears the input when the clear icon is clicked", async () => {
    // Arrange
    const inputLabel = "search"
    const clearIconlabel = "click icon to clear search"
    const text = "Hello World"

    // Act
    render(<SearchInput ariaLabel={inputLabel} onSearch={jest.fn()} />)

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
        ariaLabel="search"
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
    render(<SearchInput ariaLabel="search" showSearchButton />)

    const button = screen.getByLabelText(searchButtonLabel)

    // Assert
    expect(button).toBeInTheDocument()
  })
  it("invokes 'onSearch' only when search button is clicked when showSearchButton = 'true'", async () => {
    // Arrange
    const onSearch = jest.fn()
    const text = "Hello World"
    const inputLabel = "search"
    const searchButtonLabel = "click to search"

    // Act
    render(
      <SearchInput
        showSearchButton
        ariaLabel={inputLabel}
        onSearch={onSearch}
      />,
    )

    const input = screen.getByLabelText(inputLabel)
    const button = screen.getByLabelText(searchButtonLabel)

    await userEvent.type(input, text)
    await userEvent.click(button)

    // Assert
    expect(onSearch).toBeCalledTimes(1)
    expect(onSearch).toBeCalledWith(text)
  })
  it("invokes 'onBlur' and 'onFocus'", async () => {
    // Arrange
    const onBlur = jest.fn()
    const onFocus = jest.fn()
    const label = "search"

    // Act
    render(<SearchInput ariaLabel={label} onBlur={onBlur} onFocus={onFocus} />)

    const received = screen.getByLabelText(label)

    // Assert
    await userEvent.click(received)
    expect(onFocus).toBeCalled()

    await userEvent.tab()
    expect(onBlur).toBeCalled()
  })
  it("shows clear button on focus when value is defined and hides when blurred", async () => {
    // Arrange
    const clearButtonLabel = "click icon to clear search"
    const inputLabel = "search"
    const text = "Hello World"

    // Act
    render(<SearchInput ariaLabel={inputLabel} />)

    const input = screen.getByLabelText(inputLabel)
    const button = screen.getByLabelText(clearButtonLabel)

    // Assert
    await userEvent.click(input)
    expect(button).not.toBeVisible()
    await userEvent.type(input, text)
    expect(button).toBeVisible()
    await userEvent.tab()
    expect(button).not.toBeVisible()
  })
})
