import { KeyboardEvent, ReactElement, createContext, useRef } from "react"
import { TabList } from "./components/TabList"
import { TabPanelProps } from "./components/TabPanel"
import { Tab } from "./types"

interface TabsProps {
  children: ReactElement<TabPanelProps> | Array<ReactElement<TabPanelProps>>
  currentTab: Tab["id"]
  onTabChange: (tabId: Tab["id"]) => void
}

export const TabsContext = createContext<{ selected: Tab["id"] } | undefined>(
  undefined,
)

export function Tabs({ children, onTabChange, currentTab }: TabsProps) {
  const tabListRefs = useRef<HTMLLIElement[]>([])
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

  const onClick = (tabId: Tab["id"]) => {
    onTabChange(tabId)
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
    <TabsContext.Provider value={{ selected: currentTab }}>
      <section className="Tabs">
        <TabList
          onClick={onClick}
          onKeyDown={handleKeyPress}
          refs={tabListRefs}
          tabs={tabsOriginal}
        />
        <>{children}</>
      </section>
    </TabsContext.Provider>
  )
}

type Child = TabPanelProps & { index: number }

function tabsOfChildren(childrenArray: Child[], currentTab: Tab["id"]): Tab[] {
  return childrenArray.map((args) => ({
    ...args,
    selected: args.id === currentTab && !args.disabled,
  }))
}
