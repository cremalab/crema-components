import { Tab } from "../../types"
import styles from "./TabPanel.module.css"

interface TabPanelProps {
  tab: Tab
}

export function TabPanel({ tab }: TabPanelProps) {
  const ariaHidden = tab.selected === false
  const className = styles.TabPanel + (ariaHidden ? " " + styles.isHidden : "")

  return (
    <div
      id={tab.panelId}
      aria-labelledby={tab.id}
      aria-hidden={ariaHidden}
      className={className}
      role="tabpanel"
      tabIndex={0}
    >
      {tab.children}
    </div>
  )
}
