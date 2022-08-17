import {
  AriaAttributes,
  ChangeEvent,
  FocusEvent,
  MouseEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react"
import styles from "./SearchInput.module.css"

interface SearchInputProps extends Pick<AriaAttributes, "aria-label"> {
  name?: string
  placeholder?: string
  searchIcon?: ReactNode
  clearIcon?: ReactNode
  debounceDelay?: number
  value?: string
  onSearch?: (searchTerm: string) => void
  showSearchButton?: boolean
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void
}

export function SearchInput({
  name,
  placeholder,
  searchIcon,
  clearIcon,
  onSearch,
  debounceDelay = 300,
  showSearchButton,
  value = "",
  onBlur,
  onFocus,
  ...aria
}: SearchInputProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [cancelButtonHidden, setCancelButtonHidden] = useState(true)
  const timer = useRef<NodeJS.Timeout>()

  useEffect(() => {
    setSearchTerm(value)
  }, [value])

  useEffect(() => {
    if (searchTerm && !showSearchButton) {
      timer.current = setTimeout(() => onSearch?.(searchTerm), debounceDelay)
    }
    return () => {
      clearTimeout(timer.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, debounceDelay])

  const handleReset = (e: MouseEvent<HTMLButtonElement>) => {
    // we don't want the field to blur when a user clears the input
    e.preventDefault()
    setSearchTerm("")
    onSearch?.("")
    setCancelButtonHidden(true)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.currentTarget.value
    setSearchTerm(currentValue)
    if (!currentValue) setCancelButtonHidden(true)
    else setCancelButtonHidden(false)
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    onBlur?.(e)
    setCancelButtonHidden(true)
  }

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    onFocus?.(e)
    if (searchTerm?.length) setCancelButtonHidden(false)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container} data-testid="container">
        <span data-testid="search_icon" className={styles.searchIcon}>
          {searchIcon || <span>🔍</span>}
        </span>
        <input
          {...aria}
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
          hidden={cancelButtonHidden}
          aria-label="click icon to clear search"
          className={styles.clearIcon}
          onMouseDown={handleReset}
        >
          {clearIcon || <span>❎</span>}
        </button>
      </div>
      {showSearchButton && (
        <div className={styles.searchButton}>
          <button
            aria-label="click to search"
            onClick={() => searchTerm && onSearch?.(searchTerm)}
          >
            Search
          </button>
        </div>
      )}
    </div>
  )
}
