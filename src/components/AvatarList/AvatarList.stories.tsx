import decoratorCentered from "@storybook/addon-centered"
import { AvatarList } from "./AvatarList"

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "AvatarList",
  decorators: [decoratorCentered],
}

export const Example = () => <AvatarList />
