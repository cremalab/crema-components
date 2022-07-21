import classNames from "classnames"
import styles from "./DefaultSpinner.module.css"

interface DefaultSpinnerProps {
  size?: "small" | "medium" | "large"
}

export function DefaultSpinner({ size = "medium" }: DefaultSpinnerProps) {
  return (
    <div
      className={classNames(styles.DefaultSpinner, styles[size])}
      aria-hidden="true"
      data-testid="spinner"
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
