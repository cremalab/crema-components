import { AvatarBase, AvatarBaseProps } from "./AvatarBase"
import { getInitials } from "./utils/getInitials"

export interface AvatarProps extends Omit<AvatarBaseProps, "children"> {
  name: string
}

export function Avatar({ name, ...avatarBaseProps }: AvatarProps) {
  const Child = () => {
    if (avatarBaseProps.src) {
      return null
    } else {
      const initials = getInitials(name)
      return <span>{initials}</span>
    }
  }

  const ariaLabel = avatarBaseProps.src
    ? `An avatar with an image of ${name}`
    : `An avatar with initials for ${name}`

  return (
    <AvatarBase ariaLabel={ariaLabel} {...avatarBaseProps}>
      <Child />
    </AvatarBase>
  )
}
