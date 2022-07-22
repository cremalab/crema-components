import { ReactElement, useState } from "react"
import { MenuItems } from "../MenuItems"
import { TabProps } from "../Tab"
import { Content } from "../Content"

interface TabsProps {
  children: ReactElement<TabProps> | Array<ReactElement<TabProps>>
  initialTab?: number
  onTab?: (index: number) => void
}

export function Tabs({ children, onTab, initialTab = 0 }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(initialTab)

  const childrenArray = Array.isArray(children) ? children : [children]
  const tabs = childrenArray.map(({ props: { label, children } }) => ({
    label,
    content: children,
  }))

  const onClick = (index: number) => {
    setActiveIndex(index)
    onTab?.(index)
  }

  return (
    <div className="Tabs">
      <div className="Tabs-MenuItems">
        <MenuItems activeIndex={activeIndex} onClick={onClick} tabs={tabs} />
      </div>
      <div className="Tabs-Content">
        <Content activeIndex={activeIndex} tabs={tabs} />
      </div>
    </div>
  )
}
