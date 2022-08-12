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
  const [currentTab, setCurrentTab] = useState("1")
  return (
    <Tabs currentTab={currentTab} onTabChange={setCurrentTab}>
      <Tab id="1" label="Tab 1">
        Content 1
      </Tab>
      <Tab id="2" label="Tab 2">
        Content 2
      </Tab>
      <Tab id="3" label="Tab 3">
        Content 3
      </Tab>
    </Tabs>
  )
}

export const WithDisabled = () => {
  const [currentTab, setCurrentTab] = useState("2")
  return (
    <Tabs currentTab={currentTab} onTabChange={setCurrentTab}>
      <Tab id="1" label="Tab 1" disabled>
        Content 1
      </Tab>
      <Tab id="2" label="Tab 2">
        Content 2
      </Tab>
      <Tab id="3" label="Tab 3" disabled>
        Content 3
      </Tab>
      <Tab id="4" label="Tab 4" disabled>
        Content 4
      </Tab>
      <Tab id="5" label="Tab 5">
        Content 5
      </Tab>
      <Tab id="6" label="Tab 6">
        Content 6
      </Tab>
    </Tabs>
  )
}
