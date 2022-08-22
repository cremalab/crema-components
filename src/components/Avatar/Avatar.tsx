import styles from "./Avatar.module.css"
import { getInitials } from "./utils/getInitials"

interface AvatarProps {
  name: string
  size: "small" | "medium" | "large"
  src?: string
}

export function Avatar({ name, size = "small", src }: AvatarProps) {
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
