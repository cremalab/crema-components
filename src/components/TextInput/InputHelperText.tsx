import { ReactNode } from "react"

interface Props {
  className?: string
  helperText?: ReactNode
  helperTextId: string
}

export function InputHelperText({
  className,
  helperTextId,
  helperText,
}: Props) {
  return (
    <div className={className} id={helperTextId}>
      {helperText}
    </div>
  )
}
