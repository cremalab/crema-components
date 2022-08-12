import { Tab } from "../../types"
import styles from "./TabPanel.module.css"

interface TabPanelProps {
  tab: Tab
}

export function TabPanel({ tab }: TabPanelProps) {
  const hidden = tab.selected === false
  const className = styles.container + (hidden ? " " + styles.hidden : "")

  return (
    <div
      id={tab.panelId}
      aria-labelledby={tab.id}
      aria-hidden={hidden}
      className={className}
      role="tabpanel"
      tabIndex={0}
    >
      {tab.children}
    </div>
  )
}
