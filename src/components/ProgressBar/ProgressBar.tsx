import classNames from "classnames"
import styles from "./ProgressBar.module.css"

export interface ProgressBarProps {
  /** A number between 0-100 */
  value?: number
}

const getPercentageString = (value?: number) => {
  if (value) {
    return value + "%"
  } else {
    return "100%"
  }
}

export function ProgressBar(props: ProgressBarProps) {
  return (
    <div style={{ width: "auto" }}>
      <div
        className={classNames(styles.progressBarTrack, styles.progressBar)}
      />
      <div
        style={{
          width: getPercentageString(props.value),
        }}
        className={classNames(styles.progressBar, styles.progressBarIndicator, {
          [styles.progressBarIndeterminate]: !props.value,
        })}
      />
    </div>
  )
}
