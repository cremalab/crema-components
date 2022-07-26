import { KeyboardEvent, ReactElement, useRef } from "react"
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
  onTab: (index: number) => void
}

export function Tabs({ children, onTab, currentTab }: TabsProps) {
  // We use a list of refs for tablist nodes so we can focus them programmatically
  const tabListRefs = useRef<(HTMLLIElement | null)[]>([])

  // Sometimes children is an array; sometimes it's a single node
  const childrenArray = Array.isArray(children) ? children : [children]

  /**
   * We map children to Tab[] for use with TabList and TabPanel.
   * NOTE that we are computing `isSelected` at this point only.
   */
  const tabs: Tab[] = childrenArray.map(
    ({ props: { label, children } }, index) => ({
      children,
      id: `tab-${index}`,
      index,
      isSelected: index === currentTab,
      label,
      panelId: `tab-${index}-panel`,
    }),
  )

  const onClick = (tab: Tab) => {
    onTab(tab.index)
  }

  // Calls onTab with next tab AND focusses the next TabListItem
  const setCurrentTab = (nextIndex: number) => {
    onTab(nextIndex)
    tabListRefs.current[nextIndex]?.focus()
  }

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      // Handles wrapping from 0 to the end of the list
      const nextIndex = currentTab !== 0 ? currentTab - 1 : tabs.length - 1
      setCurrentTab(nextIndex)
    }
    if (event.key === "ArrowRight") {
      // Handles wrapping from the end of the list to 0
      const nextIndex = currentTab !== tabs.length - 1 ? currentTab + 1 : 0
      setCurrentTab(nextIndex)
    }
  }

  return (
    <section className="Tabs">
      <TabList
        onClick={onClick}
        onKeyDown={handleKeyPress}
        refs={tabListRefs}
        tabs={tabs}
      />
      <>
        {tabs.map((tab) => (
          <TabPanel key={tab.panelId} tab={tab} />
        ))}
      </>
    </section>
  )
}
