import { ReactNode } from "react"
import { Tab as TabType } from "../../types"

export interface TabProps {
  children: ReactNode
  label: string
  id: TabType["id"]
  disabled?: boolean
}

export const Tab = ({ children }: TabProps) => <>{children}</>
