import styles from "./Avatar.module.css"
import { getInitials } from "./utils/getInitials"

export type AvatarSize = "sm" | "md" | "lg"

interface AvatarProps {
  name?: string
  size?: AvatarSize
  src?: string
}

export function Avatar({ name = "", size = "sm", src }: AvatarProps) {
  const Child = () => {
    if (src) {
      return null
    } else {
      const initials = getInitials(name)
      return <div className={styles.text}>{initials}</div>
    }
  }

  return (
    <div
      style={{
        backgroundImage: `url(${src})`,
      }}
      className={styles.container}
      data-size={size}
    >
      <Child />
    </div>
  )
}
