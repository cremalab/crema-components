import { ComponentMeta, Story } from "@storybook/react"
import { ComponentProps } from "react"
import { Loader } from "./Loader"

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "Components/Loader",
} as ComponentMeta<typeof Loader>

const Template: Story<ComponentProps<typeof Loader>> = (args) => (
  <Loader {...args} />
)

export const Default = Template.bind({})

Default.args = {
  timeout: 500,
}

export const WithChildren = Template.bind({})

WithChildren.args = {
  timeout: 500,
  children: <div>Loading</div>,
}
