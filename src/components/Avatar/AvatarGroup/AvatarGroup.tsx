import { ComponentElement, ComponentState } from "react"
import { Avatar, AvatarProps } from ".."
import { AvatarBase } from "../AvatarBase"
import styles from "./AvatarGroup.module.css"

type AvatarGroupChildren =
  | ComponentElement<AvatarProps, ComponentState>
  | ComponentElement<AvatarProps, ComponentState>[]

export interface AvatarGroupProps {
  max?: number
  size?: AvatarProps["size"]
  renderHiddenCount?: (hiddenCount: number) => JSX.Element
  children: AvatarGroupChildren
}

export function AvatarGroup({
  size = "sm",
  max = 3,
  children,
  renderHiddenCount,
}: AvatarGroupProps) {
  const childrenArray = Array.isArray(children) ? children : [children]
  const visibleChildren = childrenArray.slice(0, max)
  const hiddenCount = childrenArray.length - visibleChildren.length

  if (childrenArray.some((child) => child.type.name !== "Avatar")) {
    throw new Error("<AvatarGroup /> only accepts <Avatar /> children")
  }

  return (
    <div className={styles.container}>
      {visibleChildren.map(({ props }, index) => (
        <div
          data-testid={`avatar_item_${index}`}
          key={index}
          className={styles.item}
        >
          <Avatar {...props} size={size} />
        </div>
      ))}
      <HiddenCount
        count={hiddenCount}
        size={size}
        render={renderHiddenCount}
        total={childrenArray.length}
      />
    </div>
  )
}

interface HiddenCountProps {
  count: number
  size: AvatarGroupProps["size"]
  render: AvatarGroupProps["renderHiddenCount"]
  total: number
}

function HiddenCount({ count, render, size, total }: HiddenCountProps) {
  if (!count) return null

  if (render) return render(count)

  const ariaLabel =
    count === 1 ? `${count} hidden avatar` : `${count} hidden avatars`

  return (
    <div className={styles.item} style={{ zIndex: total - 1 }}>
      <AvatarBase ariaLabel={ariaLabel} size={size}>
        +{count}
      </AvatarBase>
    </div>
  )
}
