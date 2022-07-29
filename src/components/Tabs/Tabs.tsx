import { KeyboardEvent, ReactElement, ReactNode, useRef } from "react"
import { TabList } from "./components/TabList"
import { TabProps } from "./components/Tab"
import { TabPanel } from "./components/TabPanel"
import { Tab } from "./types"

interface TabsProps {
  children: ReactElement<TabProps> | Array<ReactElement<TabProps>>
  currentTab: number
  onTabChange: (index: number) => void
}

export function Tabs({ children, onTabChange, currentTab }: TabsProps) {
  // We use a list of refs for tablist nodes so we can focus them programmatically
  const tabListRefs = useRef<(HTMLLIElement | null)[]>([])

  // Sometimes children is an array; sometimes it's a single node—let's make it an array
  const childrenArray = Array.isArray(children) ? children : [children]

  // Let's make sure the
  let currentIndex =
    currentTab < 0 || currentTab > childrenArray.length - 1 ? 0 : currentTab

  // Importantly, we need to track the original index of the children; we spread props here
  const childrenWithIndex = childrenArray.map((child, index) => ({
    ...child.props,
    index,
  }))

  // We need to know if the user passes a currentTab that is disabled—we need to fix that
  const isDisabledCurrent = childrenWithIndex.find(
    (child) => child.disabled && child.index === currentIndex,
  )

  // Now we need to create a list of only enabled children
  const childrenEnabled = childrenWithIndex.filter((child) => !child.disabled)
  if (isDisabledCurrent) {
    /**
     * If we discovered that the currentTab is disabled, we set the new currentTab to
     * the index of the first enabled tab we have.
     **/
    currentIndex = childrenEnabled[0].index
  }

  /**
   * We map children to Tab[] for use with TabList and TabPanel
   * NOTE: We are computing `isSelected` at this point only
   * NOTE: `index` is stored here—we'll need it to handle skipping disabled tabs
   */

  // We need the full set of the original tabs—including disabled for rendering TabList
  const tabsOriginal = tabsOfChildren(childrenWithIndex, currentIndex)

  // We need the fully mapped set of enabled tabs for arrow key navigation as well
  const tabsEnabled = tabsOfChildren(childrenEnabled, currentIndex)

  const tabsEnabledCurrentIndex = tabsEnabled.findIndex(
    (tab) => tab.index === currentIndex,
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
    onTabChange(tab.index)
  }

  const handleKeyPress = (event: KeyboardEvent) => {
    const setCurrentTab = (nextIndex: number) => {
      onTabChange(nextIndex)
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
