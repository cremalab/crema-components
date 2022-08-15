import {
  ChangeEvent,
  ComponentProps,
  FocusEvent,
  MouseEvent,
  ReactNode,
  useEffect,
  useState,
} from "react"
import styles from "./SearchInput.module.css"

interface SearchInputProps extends ComponentProps<"input"> {
  searchIcon?: ReactNode
  clearIcon?: ReactNode
  onDebounce?: (searchTerm: string) => void
  debounceDelay?: number
  onSearchClick?: (searchTerm: string) => void
  value?: string
}

export function SearchInput({
  name,
  placeholder,
  searchIcon,
  clearIcon,
  onDebounce,
  debounceDelay = 300,
  onSearchClick,
  value = "",
  ...inputProps
}: SearchInputProps) {
  const [inputValue, setInputValue] = useState("")
  const [hideCancelButton, setHideCancelButton] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => onDebounce?.(inputValue), debounceDelay)
    return () => {
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, debounceDelay])

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const handleReset = (e: MouseEvent<HTMLButtonElement>) => {
    // we don't want the field to blur when a user clears the input
    e.preventDefault()
    setInputValue("")
    setHideCancelButton(true)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    inputProps.onChange?.(e)
    setInputValue(value)
    if (!inputValue) setHideCancelButton(true)
    else setHideCancelButton(false)
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    inputProps.onBlur?.(e)
    setHideCancelButton(true)
  }

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    inputProps.onFocus?.(e)
    if (inputValue?.length) setHideCancelButton(false)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container} data-testid="container">
        <span data-testid="search_icon" className={styles.searchIcon}>
          {searchIcon || <span>🔍</span>}
        </span>
        <input
          {...inputProps}
          type="search"
          className={styles.input}
          onBlur={handleBlur}
          onFocus={handleFocus}
          value={inputValue}
          name={name}
          placeholder={placeholder}
          onChange={handleChange}
        />
        <button
          // we are ignoring tabbing since 'esc' is the keyboard accessible means of clearing an input
          tabIndex={-1}
          aria-label="click icon to clear search"
          hidden={hideCancelButton}
          className={styles.clearIcon}
          onMouseDown={handleReset}
        >
          {clearIcon || <span>❎</span>}
        </button>
      </div>
      {onSearchClick && (
        <div className={styles.searchButton}>
          <button
            aria-label="click to search"
            onClick={() => onSearchClick?.(value)}
          >
            Search
          </button>
        </div>
      )}
    </div>
  )
}
