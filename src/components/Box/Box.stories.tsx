import decoratorCentered from "@storybook/addon-centered"
import { Box } from "./Box"

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "Box",
  decorators: [decoratorCentered],
}

export const Example = () => <Box />
