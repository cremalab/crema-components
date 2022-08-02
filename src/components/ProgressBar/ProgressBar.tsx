import classNames from "classnames"
import styles from "./ProgressBar.module.css"

const MIN = 0
const MAX = 100

const getTransformStyle = (value?: number) => {
  if (value || value === 0) {
    const transform = value - 100
    return `translateX(${transform}%)`
  } else {
    return
  }
}

const getIndicatorClasses = (value?: number) => {
  return classNames(styles.progressBarIndicator, {
    [styles.progressBarIndeterminate]: !value,
  })
}

const getAriaProgressLabels = (value?: number) => {
  if (value || value === 0) {
    return {
      "aria-valuenow": value,
      "aria-valuemin": MIN,
      "aria-valuemax": MAX,
    }
  } else {
    return {}
  }
}

export interface ProgressBarProps {
  /** A number between 0-100 */
  value?: number
  ariaLabel?: string
}

export function ProgressBar({ value, ariaLabel }: ProgressBarProps) {
  const indicatorClasses = getIndicatorClasses(value)
  const transform = getTransformStyle(value)
  const ariaLabels = getAriaProgressLabels(value)

  return (
    <div
      role="progressbar"
      {...ariaLabels}
      aria-busy={value !== 100}
      aria-label={ariaLabel}
    >
      <div className={styles.progressBarTrack}>
        <span
          data-testid="progressbar_indicator"
          style={{ transform }}
          className={indicatorClasses}
        />
      </div>
    </div>
  )
}
