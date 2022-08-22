import styles from "./Avatar.module.css"
import { getInitials } from "./utils/getInitials"

export type AvatarSize = "sm" | "md" | "lg"

interface AvatarProps {
  name: string
  size?: AvatarSize
  src?: string
}

export function Avatar({ name, size = "sm", src }: AvatarProps) {
  const Child = () => {
    if (src) {
      return null
    } else {
      const initials = getInitials(name)
      return <div className={styles.text}>{initials}</div>
    }
  }

  const ariaLabel = src
    ? `An avatar with an image of ${name}`
    : `An avatar with initials for ${name}`

  return (
    <div
      aria-label={ariaLabel}
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
