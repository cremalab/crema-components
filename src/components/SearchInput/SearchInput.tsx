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
  startIcon?: ReactNode
  endIcon?: ReactNode
  label?: string
  onDebounce?: (text: string) => void
  onSearchClick?: (text: string) => void
  debounceDelay?: number
}

export function SearchInput({
  startIcon,
  endIcon,
  onDebounce,
  debounceDelay = 300,
  onSearchClick,
  ...inputProps
}: SearchInputProps) {
  const [text, setText] = useState("")
  const [hideCancelButton, setHideCancelButton] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => onDebounce?.(text), debounceDelay)
    return () => {
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, debounceDelay])

  const handleReset = (e: MouseEvent<HTMLButtonElement>) => {
    // we don't want the field to blur when a user clears the input
    e.preventDefault()
    setText("")
    setHideCancelButton(true)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    setText(value)
    inputProps.onChange?.(e)
    if (!value) setHideCancelButton(true)
    else setHideCancelButton(false)
  }

  const handleBlur = () => {
    setHideCancelButton(true)
  }

  const handleFocus = () => {
    if (text.length) {
      setHideCancelButton(false)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container} data-testid="container">
        <span data-testid="start_icon" className={styles.startIcon}>
          {startIcon || <span>🔍</span>}
        </span>
        <input
          type="search"
          className={styles.input}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          value={text}
          {...inputProps}
        />
        <button
          // we are ignoring tabbing since 'esc' is the keyboard accessible means of clearing an input
          tabIndex={-1}
          aria-label="click icon to clear search"
          hidden={hideCancelButton}
          className={styles.endIcon}
          onMouseDown={handleReset}
        >
          {endIcon || <span>❎</span>}
        </button>
      </div>
      {onSearchClick && (
        <div className={styles.searchButton}>
          <button
            aria-label="click to search"
            onClick={() => onSearchClick?.(text)}
          >
            Search
          </button>
        </div>
      )}
    </div>
  )
}
