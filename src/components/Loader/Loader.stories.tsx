import decoratorCentered from "@storybook/addon-centered"
import { Loader } from "./Loader"

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "Loader",
  decorators: [decoratorCentered],
}

export const Example = () => <Loader />
