import styles from "./DefaultSpinner.module.css"

interface DefaultSpinnerProps {
  size?: "small" | "medium" | "large"
}

export function DefaultSpinner({ size = "medium" }: DefaultSpinnerProps) {
  return (
    <div
      className={`${styles.DefaultSpinner} ${styles[size]}`}
      aria-hidden="true"
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
