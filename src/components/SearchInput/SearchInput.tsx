import {
  AriaAttributes,
  ChangeEvent,
  FocusEvent,
  MouseEvent,
  ReactNode,
  useEffect,
  useState,
} from "react"
import styles from "./SearchInput.module.css"

interface SearchInputProps extends Pick<AriaAttributes, "aria-label"> {
  name?: string
  placeholder?: string
  searchIcon?: ReactNode
  clearIcon?: ReactNode
  debounceDelay?: number
  initialValue?: string
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
  initialValue = "",
  onBlur,
  onFocus,
  ...aria
}: SearchInputProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [cancelButtonHidden, setCancelButtonHidden] = useState(true)

  useEffect(() => {
    setSearchTerm(initialValue)
  }, [initialValue])

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined
    if (searchTerm) {
      timer = setTimeout(() => onSearch?.(searchTerm), debounceDelay)
    }
    return () => {
      if (timer) clearTimeout(timer)
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
    const { value } = e.currentTarget
    setSearchTerm(value)
    if (!value) setCancelButtonHidden(true)
    else setCancelButtonHidden(false)
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    onBlur?.(e)
    console.log("handleBlur")
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
            onClick={() => onSearch?.(searchTerm)}
          >
            Search
          </button>
        </div>
      )}
    </div>
  )
}
