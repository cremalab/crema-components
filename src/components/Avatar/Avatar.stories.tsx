import { ComponentStory } from "@storybook/react"
import avatarImage from "../../assets/justink.jpeg"
import { Avatar, AvatarSize } from "."

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

const options: AvatarSize[] = ["sm", "md", "lg"]

export default {
  title: "Components/Avatar",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "select",
      options,
    },
  },
}

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />

export const Basic = Template.bind({})

Basic.args = {
  name: "Crema Components",
}

export const Small = Template.bind({})

Small.args = { ...Basic.args, size: "sm" }

export const Medium = Template.bind({})

Medium.args = { ...Basic.args, size: "md" }

export const Large = Template.bind({})

Large.args = { ...Basic.args, size: "lg" }

export const WithImage = Template.bind({})

WithImage.args = {
  ...Basic.args,
  size: "lg",
  src: avatarImage,
}

export const WithCustomColors = Template.bind({})

WithCustomColors.args = {
  ...Basic.args,
  fontColor: "#000000",
  background: "#FFA500",
}
