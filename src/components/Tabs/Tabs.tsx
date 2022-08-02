import { KeyboardEvent, ReactElement, useRef } from "react"
import { TabList } from "./components/TabList"
import { TabProps } from "./components/Tab"
import { TabPanel } from "./components/TabPanel"
import { Tab } from "./types"

interface TabsProps {
  children: ReactElement<TabProps> | Array<ReactElement<TabProps>>
  currentTab: Tab["id"]
  onTabChange: (id: Tab["id"]) => void
}

export function Tabs({ children, onTabChange, currentTab }: TabsProps) {
  const tabListRefs = useRef<(HTMLLIElement | null)[]>([])
  const childrenArray = Array.isArray(children) ? children : [children]

  const childrenWithIndex = childrenArray.map((child, index) => ({
    ...child.props,
    index,
  }))

  const current = childrenWithIndex.find((child) => child.id === currentTab)

  if (!current) {
    throw new Error(`currentTab '${currentTab}' does not exist`)
  }

  const isDisabledCurrent = current?.disabled === true

  if (isDisabledCurrent) {
    throw new Error(`currentTab '${currentTab}' is disabled`)
  }

  const childrenEnabled = childrenWithIndex.filter((child) => !child.disabled)

  const tabsOriginal = tabsOfChildren(childrenWithIndex, currentTab)

  const tabsEnabled = tabsOfChildren(childrenEnabled, currentTab)

  const tabsEnabledCurrentIndex = tabsEnabled.findIndex(
    (tab) => tab.id === currentTab,
  )

  const tabsEnabledPrevIndex =
    tabsEnabledCurrentIndex === 0
      ? tabsEnabled[tabsEnabled.length - 1]?.index
      : tabsEnabled[tabsEnabledCurrentIndex - 1]?.index

  const tabEnabledNextIndex =
    tabsEnabledCurrentIndex === tabsEnabled.length - 1
      ? tabsEnabled[0]?.index
      : tabsEnabled[tabsEnabledCurrentIndex + 1]?.index

  const onClick = (tab: Tab) => {
    onTabChange(tab.id)
  }

  const handleKeyPress = (event: KeyboardEvent) => {
    const setCurrentTab = (nextIndex: number) => {
      onTabChange(tabsOriginal[nextIndex].id)
      tabListRefs.current[nextIndex]?.focus()
    }

    if (event.key === "ArrowLeft") {
      setCurrentTab(tabsEnabledPrevIndex)
    }
    if (event.key === "ArrowRight") {
      setCurrentTab(tabEnabledNextIndex)
    }
  }

  return (
    <section className="Tabs">
      <TabList
        onClick={onClick}
        onKeyDown={handleKeyPress}
        refs={tabListRefs}
        tabs={tabsOriginal}
      />
      <>
        {tabsEnabled.map((tab) => (
          <TabPanel key={tab.panelId} tab={tab} />
        ))}
      </>
    </section>
  )
}

type Child = TabProps & { index: number }

function tabsOfChildren(childrenArray: Child[], currentTab: Tab["id"]): Tab[] {
  return childrenArray.map((args) => ({
    ...args,
    selected: args.id === currentTab && !args.disabled,
    panelId: `tab-${args.index}-panel`,
  }))
}
