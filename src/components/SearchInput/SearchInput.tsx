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
  const [searchTerm, setSearchTerm] = useState(value)
  const [hideCancelButton, setHideCancelButton] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => onDebounce?.(searchTerm), debounceDelay)
    return () => {
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, debounceDelay])

  const handleReset = (e: MouseEvent<HTMLButtonElement>) => {
    // we don't want the field to blur when a user clears the input
    e.preventDefault()
    setSearchTerm("")
    setHideCancelButton(true)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    inputProps.onChange?.(e)
    setSearchTerm(value)
    if (!value) setHideCancelButton(true)
    else setHideCancelButton(false)
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    inputProps.onBlur?.(e)
    setHideCancelButton(true)
  }

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    inputProps.onFocus?.(e)
    if (searchTerm?.length) setHideCancelButton(false)
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
          value={searchTerm}
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
            onClick={() => onSearchClick?.(searchTerm)}
          >
            Search
          </button>
        </div>
      )}
    </div>
  )
}
