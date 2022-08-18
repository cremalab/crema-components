import classNames from "classnames"
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

type Omitted = "onChange" | "type"

interface SearchInputProps extends Omit<ComponentProps<"input">, Omitted> {
  "aria-label": string
  searchIcon?: ReactNode
  clearIcon?: ReactNode
  debounceDelay?: number
  value?: string
  onSearch?: (searchTerm: string) => void
  showSearchButton?: boolean
}

export function SearchInput({
  searchIcon,
  clearIcon,
  onSearch,
  debounceDelay = 300,
  showSearchButton,
  value = "",
  ...inputProps
}: SearchInputProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [cancelButtonHidden, setCancelButtonHidden] = useState(true)
  const timer = useRef<NodeJS.Timeout>()

  useKeyPress(["Enter"], () => {
    onSearch?.(searchTerm)
  })

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
  }, [searchTerm, onSearch, showSearchButton, debounceDelay])

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
    setCancelButtonHidden(!currentValue)
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    inputProps.onBlur?.(e)
    setCancelButtonHidden(true)
  }

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    inputProps.onFocus?.(e)
    setCancelButtonHidden(!searchTerm.length)
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
          className={classNames(styles.input, inputProps.className)}
          onBlur={handleBlur}
          onFocus={handleFocus}
          value={searchTerm}
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
