import { Tab } from "../../types"
import { MenuItem } from "../MenuItem"
import styles from "./MenuItems.module.css"

interface MenuItemsProps {
  activeIndex: number
  onClick: (index: number) => void
  tabs: Tab[]
}

export function MenuItems({
  tabs,
  activeIndex,
  onClick: setActiveIndex,
}: MenuItemsProps) {
  return (
    <ul className={styles.MenuItems}>
      {tabs.map((tab, index) => (
        <MenuItem
          index={index}
          isActive={index === activeIndex}
          key={`tab:${tab.label}`}
          onClick={setActiveIndex}
          tab={tab}
        />
      ))}
    </ul>
  )
}
