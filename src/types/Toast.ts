import { ReactNode } from "react"

export interface Position {
  vertical: "top" | "center" | "bottom"
  horizontal: "left" | "center" | "right"
}

export type Status = "success" | "info" | "error" | "warning"

export type Toast = {
  id: string
  message: string
  status: Status
  action?: (handleClose: () => void) => ReactNode
}
