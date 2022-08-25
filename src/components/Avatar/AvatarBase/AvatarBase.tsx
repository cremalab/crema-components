import { ReactNode } from "react"
import styles from "./AvatarBase.module.css"

export type AvatarSize = "sm" | "md" | "lg"

export interface AvatarBaseProps {
  size?: AvatarSize
  children: ReactNode
  ariaLabel?: string
  src?: string
  fontColor?: string
  backgroundColor?: string
}

export function AvatarBase({
  ariaLabel,
  children,
  src,
  size = "sm",
  fontColor = "#444444",
  backgroundColor = "#b3b3b3",
}: AvatarBaseProps) {
  return (
    <div
      aria-label={ariaLabel}
      style={{
        ...(src && { backgroundImage: `url(${src})` }),
        color: fontColor,
        backgroundColor,
      }}
      className={styles.container}
      data-size={size}
    >
      {children}
    </div>
  )
}
