/**
 * Tab
 * ---
 * Represents "Tab", including its label and children and other computed properties
 */

export interface Tab {
  disabled?: boolean
  id: string
  index: number
  selected: boolean
  label: string
}
