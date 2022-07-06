import { ComponentMeta, Story } from "@storybook/react"
import { ComponentProps } from "react"
import { TextInput } from "."

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "Components/TextInput",
  component: TextInput,
} as ComponentMeta<typeof TextInput>

const Template: Story<ComponentProps<typeof TextInput>> = (args) => (
  <TextInput {...args} />
)

export const Default = Template.bind({})

Default.args = {
  className: "",
  disabled: false,
  helperText: "Enter some text",
  hideLabel: false,
  id: "1",
  label: "Base Input",
  name: "Base Input",
  type: "text",
}

export const Disabled = Template.bind({})

Disabled.args = {
  className: "",
  disabled: true,
  helperText: "Enter some text",
  hideLabel: false,
  id: "1",
  label: "Disabled Input",
  name: "Disabled Input",
  type: "text",
}

export const LabelHidden = Template.bind({})

LabelHidden.args = {
  className: "",
  disabled: true,
  helperText: "Enter some text",
  hideLabel: true,
  id: "1",
  label: "LabelHidden Input",
  name: "LabelHidden Input",
  type: "text",
}

export const WithPlaceholder = Template.bind({})

WithPlaceholder.args = {
  className: "",
  disabled: false,
  hideLabel: false,
  id: "1",
  label: "Placeholder Input",
  name: "Placeholder Input",
  placeholder: "Placeholder text",
  type: "text",
}

export const WithHelperText = Template.bind({})

WithHelperText.args = {
  className: "",
  disabled: false,
  hideLabel: false,
  id: "1",
  label: "Helper Text Input",
  name: "Helper Text Input",
  placeholder: "Placeholder text",
  type: "text",
  helperText: "Helper text",
}
