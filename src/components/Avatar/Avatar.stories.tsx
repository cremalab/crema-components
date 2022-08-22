import decoratorCentered from "@storybook/addon-centered"
import { ComponentStory } from "@storybook/react"
import { Avatar } from "./Avatar"

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "Components/Avatar",
  decorators: [decoratorCentered],
}

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />

export const Basic = Template.bind({})

Basic.args = {
  name: "Crema Components",
}

export const Small = Template.bind({})

Small.args = { ...Basic.args, size: "small" }

export const Medium = Template.bind({})

Medium.args = { ...Basic.args, size: "medium" }

export const Large = Template.bind({})

Large.args = { ...Basic.args, size: "large" }

export const WithImage = Template.bind({})

WithImage.args = {
  ...Basic.args,
  size: "large",
  src: "https://assets.website-files.com/5b6b50e79e9b6f7d0d3959a2/614a3f0710df4f2ff20e5bbd_JustinK.jpg",
}
