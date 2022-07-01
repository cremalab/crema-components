import { ReactNode } from "react"

interface Props {
  helperText: ReactNode
  helperTextId: string
}

export function InputHelperText({ helperTextId, helperText }: Props) {
  return <div id={helperTextId}>{helperText}</div>
}
