import decoratorCentered from "@storybook/addon-centered"
import { Sidebar } from "./Sidebar"

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "Sidebar",
  decorators: [decoratorCentered],
}

export const Example = () => (
  <Sidebar onClose={() => undefined} isOpen={true}>
    <p>children</p>
  </Sidebar>
)
