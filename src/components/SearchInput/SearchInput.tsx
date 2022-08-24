import {
  ChangeEvent,
  ComponentProps,
  FocusEvent,
  MouseEvent,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react"
import { useKeyPress } from "../../hooks/useKeyPress"
import styles from "./SearchInput.module.css"

const DEFAULT_DELAY = 300

type Omitted = "onChange" | "type" | "value"

interface SearchInputProps extends Omit<ComponentProps<"input">, Omitted> {
  "aria-label": string
  searchIcon?: ReactNode
  clearIcon?: ReactNode
  debounceDelay?: number
  initialValue?: string
  onSearch: (searchTerm: string) => void
  showSearchButton?: boolean
}

export function SearchInput({
  searchIcon = <span>🔍</span>,
  clearIcon = <span>❎</span>,
  onSearch,
  debounceDelay = DEFAULT_DELAY,
  showSearchButton,
  initialValue = "",
  ...inputProps
}: SearchInputProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [clearButtonHidden, setClearButtonHidden] = useState(true)

  const debouncedOnSearch = useMemo(() => {
    return debounce(onSearch, debounceDelay)
  }, [debounceDelay, onSearch])

  useKeyPress(["Enter"], () => {
    debouncedOnSearch(searchTerm)
  })

  useEffect(() => {
    setSearchTerm(initialValue)
  }, [initialValue])

  const handleReset = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setSearchTerm("")
    onSearch?.("")
    setClearButtonHidden(true)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.currentTarget?.value
    setSearchTerm(currentValue)
    setClearButtonHidden(!currentValue)
    shouldDebounceOnChange(showSearchButton) && debouncedOnSearch(currentValue)
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
            onClick={() => debouncedOnSearch(searchTerm)}
          >
            Search
          </button>
        </div>
      )}
    </div>
  )
}

const shouldDebounceOnChange = (showSearchButton?: boolean) => {
  return !showSearchButton
}

function debounce<F extends (...args: Parameters<F>) => ReturnType<F>>(
  func: F,
  waitFor: number,
) {
  let timer: NodeJS.Timeout

  const debouncedFunc = (...args: Parameters<F>) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func(...args)
    }, waitFor)
  }

  return debouncedFunc
}
