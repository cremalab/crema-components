import {
  ChangeEvent,
  ComponentProps,
  MouseEvent,
  ReactNode,
  useEffect,
  useState,
} from "react"
import styles from "./SearchInput.module.css"

interface SearchInputProps extends Omit<ComponentProps<"input">, "value"> {
  searchIcon?: ReactNode
  clearIcon?: ReactNode
  onDebounce?: (searchTerm: string) => void
  onSearchClick?: (searchTerm: string) => void
  debounceDelay?: number
}

export function SearchInput({
  searchIcon,
  clearIcon,
  onDebounce,
  debounceDelay = 300,
  onSearchClick,
  ...inputProps
}: SearchInputProps) {
  const [searchTerm, setSearchTerm] = useState("")
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
    setSearchTerm(value)
    inputProps.onChange?.(e)
    if (!value) setHideCancelButton(true)
    else setHideCancelButton(false)
  }

  const handleBlur = () => {
    setHideCancelButton(true)
  }

  const handleFocus = () => {
    if (searchTerm.length) {
      setHideCancelButton(false)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container} data-testid="container">
        <span data-testid="search_icon" className={styles.searchIcon}>
          {searchIcon || <span>🔍</span>}
        </span>
        <input
          type="search"
          className={styles.input}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          value={searchTerm}
          {...inputProps}
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
