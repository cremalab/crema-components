import { action } from "@storybook/addon-actions"
import { ComponentMeta, Story } from "@storybook/react"
import { ComponentProps } from "react"
import { Checkbox } from "."

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "Components/Checkbox",
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>

const Template: Story<ComponentProps<typeof Checkbox>> = (args) => {
  return <Checkbox {...args} />
}

export const Default = Template.bind({})

Default.args = {
  label: "Checkbox",
  id: "checkbox-id",
  isChecked: true,
  value: "checkbox-value",
  onChange: action("onChange"),
  className: "checkbox-class",
  disabled: false,
}

export const Disabled = Template.bind({})

Disabled.args = {
  label: "Checkbox",
  id: "checkbox-id",
  isChecked: true,
  value: "checkbox-value",
  onChange: action("onChange"),
  className: "checkbox-class",
  disabled: true,
}
