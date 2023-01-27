import { AvatarBase, AvatarBaseProps } from "./AvatarBase"
import { getInitials } from "./utils/getInitials"

export interface AvatarProps
  extends Omit<AvatarBaseProps, "children" | "ariaLabel"> {
  name: string
}

export function Avatar({ name, ...avatarBaseProps }: AvatarProps) {
  const hasImage = Boolean(avatarBaseProps.src)

  const ariaLabel = avatarBaseProps.src
    ? `An avatar with an image of ${name}`
    : `An avatar with initials for ${name}`

  return (
    <AvatarBase ariaLabel={ariaLabel} {...avatarBaseProps}>
      {hasImage ? null : getInitials(name)}
    </AvatarBase>
  )
}
