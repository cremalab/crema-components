import { ReactNode } from "react"

/**
 * Tab
 * ---
 * Represents "Tab", including its label and children and other computed properties
 */

export interface Tab {
  children: ReactNode
  id: string
  index: number
  isSelected: boolean
  label: string
  panelId: string
}