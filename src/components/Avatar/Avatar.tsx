import styles from "./Avatar.module.css"
import { getInitials } from "./utils/getInitials"

interface AvatarProps {
  name: string
  size: "small" | "medium" | "large"
  src?: string
}

const shouldShowInitials = (src?: string) => {
  return !src
}

export function Avatar({ name, size = "small", src }: AvatarProps) {
  const initials = getInitials(name)

  return (
    <div
      style={{
        backgroundImage: `url(${src})`,
      }}
      className={styles.container}
      data-size={size}
    >
      {shouldShowInitials(src) && <div className={styles.text}>{initials}</div>}
    </div>
  )
}
