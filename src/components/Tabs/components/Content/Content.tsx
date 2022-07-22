import { Tab } from "../../types"
import styles from "./Content.module.css"

interface ContentProps {
  activeIndex: number
  tabs: Tab[]
}

export function Content({ tabs, activeIndex }: ContentProps) {
  return (
    <div className={styles.Content}>
      {tabs.map((tab, index) => (index === activeIndex ? tab.content : null))}
    </div>
  )
}
