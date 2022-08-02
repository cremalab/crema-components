import { KeyboardEvent, MutableRefObject } from "react"
import { Tab } from "../../types"
import styles from "./TabList.module.css"

interface TabListProps {
  onClick: (tabId: Tab["id"]) => void
  onKeyDown: (event: KeyboardEvent) => void
  tabs: Tab[]
  refs: MutableRefObject<HTMLLIElement[]>
}

export function TabList({ tabs, onClick, onKeyDown, refs }: TabListProps) {
  return (
    <ul
      aria-label="List of Tabs"
      aria-orientation="horizontal"
      className={styles.container}
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
  onClick: (tabId: Tab["id"]) => void
  onKeyDown: (event: KeyboardEvent) => void
  tab: Tab
  refs: MutableRefObject<HTMLLIElement[]>
}

export function TabListItem({
  onClick,
  onKeyDown,
  tab,
  refs,
}: TabListItemProps) {
  const className =
    styles.item +
    (tab.selected ? " " + styles.selected : "") +
    (tab.disabled ? " " + styles.disabled : "")

  const handleClick = () => onClick(tab.id)

  return (
    <li
      aria-controls={tab.panelId}
      aria-disabled={tab.disabled}
      aria-selected={tab.selected}
      className={className}
      id={tab.id}
      onClick={handleClick}
      onKeyDown={onKeyDown}
      ref={(ref) => {
        if (ref) refs.current[tab.index] = ref
      }}
      role="tab"
      tabIndex={tab.selected ? 0 : -1}
    >
      {tab.label}
    </li>
  )
}
