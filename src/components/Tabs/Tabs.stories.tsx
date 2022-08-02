import { useState } from "@storybook/addons"
import { ComponentMeta } from "@storybook/react"
import { TabPanel, Tabs } from "."

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
      <TabPanel id="1" label="Tab 1">
        Content 1
      </TabPanel>
      <TabPanel id="2" label="Tab 2">
        Content 2
      </TabPanel>
      <TabPanel id="3" label="Tab 3">
        Content 3
      </TabPanel>
    </Tabs>
  )
}

export const WithDisabled = () => {
  const [currentTab, setCurrentTab] = useState("2")
  return (
    <Tabs currentTab={currentTab} onTabChange={setCurrentTab}>
      <TabPanel id="1" label="Tab 1" disabled>
        Content 1
      </TabPanel>
      <TabPanel id="2" label="Tab 2">
        Content 2
      </TabPanel>
      <TabPanel id="3" label="Tab 3" disabled>
        Content 3
      </TabPanel>
      <TabPanel id="4" label="Tab 4" disabled>
        Content 4
      </TabPanel>
      <TabPanel id="5" label="Tab 5">
        Content 5
      </TabPanel>
      <TabPanel id="6" label="Tab 6">
        Content 6
      </TabPanel>
    </Tabs>
  )
}
