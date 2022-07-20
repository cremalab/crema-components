import decoratorCentered from "@storybook/addon-centered"
import { Toast } from "./Toast"

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "Toast",
  decorators: [decoratorCentered],
}

export const Example = () => <Toast />
