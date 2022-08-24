import { ComponentElement, ComponentState } from "react"
import { Avatar, AvatarProps, avatarStyles } from "../Avatar"
import styles from "./AvatarGroup.module.css"

interface AvatarGroupProps {
  max?: number
  size?: AvatarProps["size"]
  children:
    | ComponentElement<AvatarProps, ComponentState>
    | ComponentElement<AvatarProps, ComponentState>[]
}

export function AvatarGroup({
  size = "sm",
  max = 3,
  children,
}: AvatarGroupProps) {
  const childrenArray = Array.isArray(children) ? children : [children]
  const slicedChildren = childrenArray.slice(0, max)
  const remaining = childrenArray.length - slicedChildren.length

  if (childrenArray.some((child) => child.type.name !== "Avatar")) {
    throw new Error("<AvatarGroup /> only accepts <Avatar /> children")
  }

  if (childrenArray.length < 2) {
    throw new Error(
      "<AvatarGroup /> should contain at least 2 children. \n Consider using <Avatar /> on its own.",
    )
  }

  const Remaining = () => {
    if (remaining) {
      return (
        <div
          className={styles.item}
          style={{ zIndex: 1000 - childrenArray.length }}
        >
          <div data-size={size} className={avatarStyles.container}>
            <p>+{remaining}</p>
          </div>
        </div>
      )
    } else {
      return null
    }
  }

  return (
    <div className={styles.container}>
      {slicedChildren.map(({ props }, index) => (
        <div
          data-testid={`avatar_item_${index}`}
          key={index}
          className={styles.item}
          style={{ zIndex: 1000 - index }}
        >
          <Avatar {...props} size={size} />
        </div>
      ))}
      <Remaining />
    </div>
  )
}
