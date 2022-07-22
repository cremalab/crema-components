import { ReactNode } from "react"

export interface TabProps {
  children: ReactNode
  label: string
}

export const Tab = ({ children }: TabProps) => <>{children}</>
