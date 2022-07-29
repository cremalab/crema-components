import { ReactNode } from "react"

export interface TabProps {
  children: ReactNode
  label: string
  disabled?: boolean
}

export const Tab = ({ children }: TabProps) => <>{children}</>
