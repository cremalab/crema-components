import { ReactNode, useContext } from "react"
import { TabsContext } from "../../Tabs"
import { Tab } from "../../types"
import styles from "./TabPanel.module.css"

export interface TabPanelProps {
  children: ReactNode
  label: string
  id: Tab["id"]
  disabled?: boolean
}

export function TabPanel({ id, children }: TabPanelProps) {
  const ctx = useContext(TabsContext)
  const selected = ctx?.selected === id

  const hidden = selected === false
  const className = styles.container + (hidden ? " " + styles.hidden : "")

  return (
    <div
      id={`panel-${id}`}
      aria-labelledby={id}
      aria-hidden={hidden}
      className={className}
      role="tabpanel"
      tabIndex={0}
    >
      {children}
    </div>
  )
}
