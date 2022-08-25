import { ComponentElement, ComponentState } from "react"
import { Avatar, AvatarProps } from ".."
import { AvatarBase } from "../AvatarBase"
import styles from "./AvatarGroup.module.css"

type AvatarGroupChildren =
  | ComponentElement<AvatarProps, ComponentState>
  | ComponentElement<AvatarProps, ComponentState>[]

interface AvatarGroupProps {
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
  const slicedChildren = childrenArray.slice(0, max)
  const hiddenCount = childrenArray.length - slicedChildren.length

  if (childrenArray.some((child) => child.type.name !== "Avatar")) {
    throw new Error("<AvatarGroup /> only accepts <Avatar /> children")
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
      <HiddenCount
        hiddenCount={hiddenCount}
        size={size}
        renderHiddenCount={renderHiddenCount}
        total={childrenArray.length}
      />
    </div>
  )
}

interface HiddenCountProps {
  hiddenCount: number
  size: AvatarGroupProps["size"]
  renderHiddenCount: AvatarGroupProps["renderHiddenCount"]
  total: number
}

function HiddenCount({
  hiddenCount,
  renderHiddenCount,
  size,
  total,
}: HiddenCountProps) {
  if (!hiddenCount) return null

  if (renderHiddenCount) {
    return renderHiddenCount(hiddenCount)
  } else {
    const ariaLabel =
      hiddenCount === 1
        ? `${hiddenCount} hidden avatar`
        : `${hiddenCount} hidden avatars`

    return (
      <div className={styles.item} style={{ zIndex: 1000 - total }}>
        <AvatarBase ariaLabel={ariaLabel} size={size}>
          +{hiddenCount}
        </AvatarBase>
      </div>
    )
  }
}
