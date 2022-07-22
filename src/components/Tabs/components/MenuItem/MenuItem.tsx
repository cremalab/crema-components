import classNames from "classnames"
import { Tab } from "../../types"
import styles from "./MenuItem.module.css"

export interface MenuItemProps {
  index: number
  isActive: boolean
  onClick: (index: number) => void
  tab: Tab
}

export function MenuItem({ onClick, index, tab, isActive }: MenuItemProps) {
  const className = classNames(styles.MenuItem, { [styles.isActive]: isActive })

  const handleClick = () => onClick(index)

  return (
    <li
      className={className}
      onClick={handleClick}
      onKeyUp={handleClick}
      role="menuitem"
    >
      {tab.label}
    </li>
  )
}
