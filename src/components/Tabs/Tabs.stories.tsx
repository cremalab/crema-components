import { useState } from "@storybook/addons"
import { ComponentMeta } from "@storybook/react"
import { Tab, Tabs } from "."

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "Components/Tabs",
  component: Tabs,
} as ComponentMeta<typeof Tabs>

export const Default = () => {
  const [currentTab, setCurrentTab] = useState(0)
  return (
    <Tabs currentTab={currentTab} onTabChange={setCurrentTab}>
      <Tab label="Tab 1">Content 1</Tab>
      <Tab label="Tab 2">Content 2</Tab>
      <Tab label="Tab 3">Content 3</Tab>
    </Tabs>
  )
}

export const WithDisabledIndex = () => {
  const [currentTab, setCurrentTab] = useState(0)
  return (
    <Tabs currentTab={currentTab} onTabChange={setCurrentTab}>
      <Tab label="Tab 0" disabled>
        Content 0
      </Tab>
      <Tab label="Tab 1">Content 1</Tab>
      <Tab label="Tab 2" disabled>
        Content 2
      </Tab>
      <Tab label="Tab 3" disabled>
        Content 3
      </Tab>
      <Tab label="Tab 4">Content 4</Tab>
      <Tab label="Tab 5">Content 5</Tab>
    </Tabs>
  )
}
