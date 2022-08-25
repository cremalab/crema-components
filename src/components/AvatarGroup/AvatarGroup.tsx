import { ComponentElement, ComponentState } from "react"
import { Avatar, AvatarProps } from "../Avatar"
import { AvatarBase } from "../Avatar/AvatarBase"
import styles from "./AvatarGroup.module.css"

interface AvatarGroupProps {
  max?: number
  size?: AvatarProps["size"]
  renderHiddenCount?: (hiddenCount: number) => JSX.Element
  children:
    | ComponentElement<AvatarProps, ComponentState>
    | ComponentElement<AvatarProps, ComponentState>[]
}

export function AvatarGroup({
  size = "sm",
  max = 3,
  children,
  renderHiddenCount,
}: AvatarGroupProps) {
  const childrenArray = Array.isArray(children) ? children : [children]
  const slicedChildren = childrenArray.slice(0, max)
  const hiddenCount = childrenArray.length - slicedChildren.length

  if (childrenArray.some((child) => child.type.name !== "Avatar")) {
    throw new Error("<AvatarGroup /> only accepts <Avatar /> children")
  }

  const HiddenCount = () => {
    if (!hiddenCount) return null

    if (renderHiddenCount) {
      return renderHiddenCount(hiddenCount)
    } else {
      return (
        <div
          className={styles.item}
          style={{ zIndex: 1000 - childrenArray.length }}
        >
          <AvatarBase size={size}>+{hiddenCount}</AvatarBase>
        </div>
      )
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
      <HiddenCount />
    </div>
  )
}
