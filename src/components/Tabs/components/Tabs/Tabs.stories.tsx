import { action } from "@storybook/addon-actions"
import { ComponentMeta } from "@storybook/react"
import { Tab } from "../Tab"
import { Tabs } from "./Tabs"

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "Components/Tabs",
  component: Tabs,
} as ComponentMeta<typeof Tabs>

export const Default = () => (
  <Tabs onTab={action("onTab")}>
    <Tab label="Tab 1">Content 1</Tab>
    <Tab label="Tab 2">Content 2</Tab>
    <Tab label="Tab 3">Content 3</Tab>
  </Tabs>
)

export const InitialIndex = () => (
  <Tabs onTab={action("onTab")} initialTab={1}>
    <Tab label="Tab 1">Content 1</Tab>
    <Tab label="Tab 2">Content 2</Tab>
    <Tab label="Tab 3">Content 3</Tab>
  </Tabs>
)
