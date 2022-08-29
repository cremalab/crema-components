import { ComponentStory } from "@storybook/react"
import { Box } from "./Box"

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "Components/Box",
  parameters: {
    layout: "centered",
  },
}

const Template: ComponentStory<typeof Box> = (args) => <Box {...args} />

export const WithChildren = Template.bind({})

const defaultArgs = {
  height: 500,
  width: 500,
  opacity: 0.75,
  b: "orange",
  border: "1px solid black",
}

WithChildren.args = {
  ...defaultArgs,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  children: <p style={{ fontSize: 48 }}>Hello World</p>,
}

export const WithoutChildren = Template.bind({})

WithoutChildren.args = {
  ...defaultArgs,
}
