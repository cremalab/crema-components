import {
  ChangeEvent,
  ComponentProps,
  FocusEvent,
  MouseEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react"
import { useKeyPress } from "../../hooks/useKeyPress"
import styles from "./SearchInput.module.css"

type Omitted = "onChange" | "type" | "value"

interface SearchInputProps extends Omit<ComponentProps<"input">, Omitted> {
  "aria-label": string
  searchIcon?: ReactNode
  clearIcon?: ReactNode
  debounceDelay?: number
  initialValue?: string
  onSearch?: (searchTerm: string) => void
  showSearchButton?: boolean
}

const shouldInvokeDebounce = (
  searchTerm: string,
  showSearchButton?: boolean,
) => {
  return Boolean(searchTerm && !showSearchButton)
}

export function SearchInput({
  searchIcon = <span>🔍</span>,
  clearIcon = <span>❎</span>,
  onSearch,
  debounceDelay = 300,
  showSearchButton,
  initialValue = "",
  ...inputProps
}: SearchInputProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [clearButtonHidden, setClearButtonHidden] = useState(true)
  const timer = useRef<NodeJS.Timeout>()

  useKeyPress(["Enter"], () => {
    onSearch?.(searchTerm)
  })

  useEffect(() => {
    setSearchTerm(initialValue)
  }, [initialValue])

  useEffect(() => {
    if (shouldInvokeDebounce(searchTerm, showSearchButton)) {
      timer.current = setTimeout(() => onSearch?.(searchTerm), debounceDelay)
    }
    return () => {
      clearTimeout(timer.current)
    }
  }, [searchTerm, onSearch, showSearchButton, debounceDelay])

  const handleReset = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setSearchTerm("")
    onSearch?.("")
    setClearButtonHidden(true)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.currentTarget.value
    setSearchTerm(currentValue)
    setClearButtonHidden(!currentValue)
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    inputProps.onBlur?.(e)
    setClearButtonHidden(true)
  }

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    inputProps.onFocus?.(e)
    setClearButtonHidden(!searchTerm.length)
  }

  const clearButtonClasses = [
    styles.clearButton,
    clearButtonHidden && styles.hidden,
  ].join(" ")

  const inputClasses = [styles.input, inputProps.className].join(" ")

  return (
    <div className={styles.wrapper}>
      <div className={styles.container} data-testid="container">
        <span data-testid="search_icon" className={styles.searchIcon}>
          {searchIcon}
        </span>
        <input
          {...inputProps}
          type="search"
          className={inputClasses}
          onBlur={handleBlur}
          onFocus={handleFocus}
          value={searchTerm}
          onChange={handleChange}
        />
        <button
          // we are ignoring tabbing since 'esc' is the keyboard accessible means of clearing an input
          tabIndex={-1}
          aria-label="click icon to clear search"
          className={clearButtonClasses}
          onMouseDown={handleReset}
        >
          {clearIcon}
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
