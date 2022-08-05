import { action } from "@storybook/addon-actions"
import { ComponentMeta, Story } from "@storybook/react"
import { ComponentProps } from "react"
import { Chip } from "./Chip"

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "Components/Chip",
} as ComponentMeta<typeof Chip>

const Template: Story<ComponentProps<typeof Chip>> = (args) => (
  <Chip {...args} />
)

export const Default = Template.bind({})

Default.args = {
  children: <div>Example Chip</div>,
  onSelect: action("onSelect"),
  onClose: action("onClose"),
}

export const WithoutClose = Template.bind({})

WithoutClose.args = {
  children: <div>Example Chip</div>,
  onSelect: action("onSelect"),
}

export const WithoutEvents = Template.bind({})

WithoutEvents.args = {
  children: <div>Example Chip</div>,
}
