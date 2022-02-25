import { ComponentProps, ReactElement } from "react"

export interface ButtonProps extends ComponentProps<"button"> {
  ariaLabel: string
  children: ReactElement | string
  className?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  name?: string
}

function Button({
  ariaLabel,
  children,
  className,
  onClick,
  name,
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
      name={name}
      {...buttonProps}
    >
      {children}
    </button>
  )
}

export { Button }
