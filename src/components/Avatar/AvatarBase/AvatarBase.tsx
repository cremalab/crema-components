import { ReactNode } from "react"
import styles from "./AvatarBase.module.css"

export type AvatarSize = "sm" | "md" | "lg"

export interface AvatarBaseProps {
  size?: AvatarSize
  children: ReactNode
  ariaLabel?: string
  src?: string
  fontColor?: string
  background?: string
}

export function AvatarBase({
  ariaLabel,
  children,
  src,
  size = "sm",
  fontColor: color = "#444444",
  background = "#b3b3b3",
}: AvatarBaseProps) {
  return (
    <div
      aria-label={ariaLabel}
      style={{
        color,
        background: src ? `url(${src})` : background,
        backgroundSize: "cover",
      }}
      className={styles.container}
      data-size={size}
    >
      {children}
    </div>
  )
}
