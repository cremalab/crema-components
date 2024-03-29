import { ComponentStory } from "@storybook/react"
import { Avatar, AvatarProps } from ".."
import avatarImage from "../../../assets/justink.jpeg"
import { AvatarGroup } from "./AvatarGroup"

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

const avatars: AvatarProps[] = [
  { name: "Crema Components" },
  { name: "Hello World", size: "md" },
  {
    name: "Foo Bar",
    src: avatarImage,
  },
  { name: "John Doe" },
]

export default {
  title: "Components/AvatarGroup",
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"] as AvatarProps["size"][],
    },
  },
  parameters: {
    layout: "centered",
  },
}

const Template: ComponentStory<typeof AvatarGroup> = (args) => (
  <AvatarGroup {...args} />
)

export const Basic = Template.bind({})

Basic.args = {
  size: "lg",
  children: avatars.map((props, index) => (
    <Avatar key={props.name + index} {...props} />
  )),
}

export const WithCustomHiddenCountElement = Template.bind({})

WithCustomHiddenCountElement.args = {
  ...Basic.args,
  renderHiddenCount: (hiddenCount) => (
    <p style={{ marginLeft: 8, fontSize: 24 }}>+{hiddenCount}</p>
  ),
}
