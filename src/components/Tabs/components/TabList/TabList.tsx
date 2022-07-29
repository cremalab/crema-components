import classNames from "classnames"
import { KeyboardEvent, MutableRefObject } from "react"
import { Tab } from "../../types"
import styles from "./TabList.module.css"

interface TabListProps {
  onClick: (tab: Tab) => void
  onKeyDown: (event: KeyboardEvent) => void
  tabs: Tab[]
  refs: MutableRefObject<(HTMLLIElement | null)[]>
}

export function TabList({ tabs, onClick, onKeyDown, refs }: TabListProps) {
  return (
    <ul
      aria-label="List of Tabs"
      aria-orientation="horizontal"
      className={styles.TabList}
      role="tablist"
    >
      {tabs.map((tab) => (
        <TabListItem
          key={`tab:${tab.label}`}
          onClick={onClick}
          onKeyDown={onKeyDown}
          tab={tab}
          refs={refs}
        />
      ))}
    </ul>
  )
}

export interface TabListItemProps {
  onClick: (tab: Tab) => void
  onKeyDown: (event: KeyboardEvent) => void
  tab: Tab
  refs: MutableRefObject<(HTMLLIElement | null)[]>
}

export function TabListItem({
  onClick,
  onKeyDown,
  tab,
  refs,
}: TabListItemProps) {
  const className = classNames(styles.TabListItem, {
    [styles.isActive]: tab.isSelected,
    [styles.isDisabled]: tab.disabled,
  })

  const handleClick = () => onClick(tab)

  return (
    <li
      aria-controls={tab.panelId}
      aria-disabled={tab.disabled}
      aria-selected={tab.isSelected}
      className={className}
      id={tab.id}
      onClick={handleClick}
      onKeyDown={onKeyDown}
      ref={(ref) => (refs.current[tab.index] = ref)}
      role="tab"
      tabIndex={tab.isSelected ? 0 : -1}
    >
      {tab.label}
    </li>
  )
}
