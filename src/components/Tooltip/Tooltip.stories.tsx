import decoratorCentered from "@storybook/addon-centered"
import { Tooltip } from "./Tooltip"

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "Tooltip",
  decorators: [decoratorCentered],
}

export const Example = () => <Tooltip />
