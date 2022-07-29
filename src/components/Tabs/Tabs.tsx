import { KeyboardEvent, ReactElement, ReactNode, useRef } from "react"
import { TabList } from "./components/TabList"
import { TabProps } from "./components/Tab"
import { TabPanel } from "./components/TabPanel"
import { Tab } from "./types"

interface TabsProps {
  /**
   * We constrain `children` to be element(s) with a label and children
   * props (e.g. `Tab`). This is only structural, however.
   **/
  children: ReactElement<TabProps> | Array<ReactElement<TabProps>>
  currentTab: number
  onTabChange: (index: number) => void
}

export function Tabs({
  children,
  onTabChange,
  currentTab: currentTabOriginal,
}: TabsProps) {
  let currentTab = currentTabOriginal
  // We use a list of refs for tablist nodes so we can focus them programmatically
  const tabListRefs = useRef<(HTMLLIElement | null)[]>([])

  // Sometimes children is an array; sometimes it's a single node
  const childrenArray = (Array.isArray(children) ? children : [children]).map(
    (child, index) => ({ ...child.props, index }),
  )
  const isDisabledCurrent = childrenArray.find(
    (child, i) => child.disabled && i === currentTabOriginal,
  )
  const tabsEnabled = childrenArray.filter((child) => !child.disabled)
  if (isDisabledCurrent) {
    currentTab = tabsEnabled[0].index
  }

  /**
   * We map children to Tab[] for use with TabList and TabPanel
   * NOTE: We are computing `isSelected` at this point only
   * NOTE: `index` is stored here—we'll need it to handle skipping disabled tabs
   */
  const tabsOriginal: Tab[] = tabsOfChildren(childrenArray, currentTab)
  const tabs: Tab[] = tabsOfChildren(tabsEnabled, currentTab)

  const tabCurrentIndex = tabs.findIndex((tab) => tab.index === currentTab)
  const tabPrevIndex =
    tabCurrentIndex === 0
      ? tabs[tabs.length - 1]?.index
      : tabs[tabCurrentIndex - 1]?.index
  const tabNextIndex =
    tabCurrentIndex === tabs.length - 1
      ? tabs[0]?.index
      : tabs[tabCurrentIndex + 1]?.index

  const onClick = (tab: Tab) => {
    onTabChange(tab.index)
  }

  const handleKeyPress = (event: KeyboardEvent) => {
    const setCurrentTab = (nextIndex: number) => {
      onTabChange(nextIndex)
      tabListRefs.current[nextIndex]?.focus()
    }

    if (event.key === "ArrowLeft") {
      setCurrentTab(tabPrevIndex)
    }
    if (event.key === "ArrowRight") {
      setCurrentTab(tabNextIndex)
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
        {tabs.map((tab) => (
          <TabPanel key={tab.panelId} tab={tab} />
        ))}
      </>
    </section>
  )
}

interface Child {
  index: number
  children: ReactNode
  label: string
  disabled?: boolean | undefined
}

function tabsOfChildren(childrenArray: Child[], currentTab: number): Tab[] {
  return childrenArray.map(({ children, label, disabled, index }) => ({
    children,
    label,
    disabled,
    id: `tab-${index}`,
    index,
    isSelected: index === currentTab && !disabled,
    panelId: `tab-${index}-panel`,
  }))
}
