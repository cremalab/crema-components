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

export const Example = Template.bind({})

Example.args = {
  height: 500,
  width: 500,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  children: <p style={{ fontSize: 48 }}>Hello World</p>,
  opacity: 0.75,
  b: "#888888",
  br: 8,
}
