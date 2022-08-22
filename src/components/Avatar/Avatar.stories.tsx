import decoratorCentered from "@storybook/addon-centered"
import { Avatar } from "./Avatar"

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "Avatar",
  decorators: [decoratorCentered],
}

export const Example = () => <Avatar />
