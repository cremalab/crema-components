import { action } from "@storybook/addon-actions"
import { ComponentMeta, Story } from "@storybook/react"
import { ComponentProps } from "react"
import { Button } from "./Button"

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "Button",
} as ComponentMeta<typeof Button>

const Template: Story<ComponentProps<typeof Button>> = (args) => (
  <Button {...args} />
)

export const Default = Template.bind({})

Default.args = {
  ariaLabel: "example button",
  children: "Button",
  disabled: false,
  onClick: action("onClick"),
}

export const Disabled = Template.bind({})

Disabled.args = {
  ariaLabel: "example button",
  children: "Button",
  disabled: true,
}
