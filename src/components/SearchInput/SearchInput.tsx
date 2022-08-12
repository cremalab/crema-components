import {
  ChangeEvent,
  ComponentProps,
  ReactNode,
  useEffect,
  useState,
} from "react"
import styles from "./SearchInput.module.css"

interface SearchInputProps extends Omit<ComponentProps<"input">, "value"> {
  startIcon?: ReactNode
  endIcon?: ReactNode
  label?: string
  onDebounce: (text: string) => void
  debounceDelay?: number
}

export function SearchInput({
  startIcon,
  endIcon,
  onDebounce,
  debounceDelay = 300,
  ...inputProps
}: SearchInputProps) {
  const [text, setText] = useState("")

  const handleReset = () => {
    setText?.("")
  }

  useEffect(() => {
    const timer = setTimeout(() => onDebounce?.(text), debounceDelay)
    return () => {
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, debounceDelay])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value)
    inputProps.onChange?.(e)
  }

  return (
    <div className={styles.container} data-testid="container">
      <span data-testid="start_icon" className={styles.startIcon}>
        {startIcon || <span>🔍</span>}
      </span>
      <input
        type="text"
        className={styles.input}
        onChange={handleChange}
        value={text}
        {...inputProps}
      />
      <button
        aria-label="click icon to clear search"
        hidden={!text.length}
        className={styles.endIcon}
        onClick={handleReset}
      >
        {endIcon || <span>❎</span>}
      </button>
    </div>
  )
}
