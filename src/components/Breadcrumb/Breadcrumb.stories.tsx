import { ComponentMeta, Story } from "@storybook/react"
import { ComponentProps } from "react"
import { Breadcrumb } from "./Breadcrumb"
import { BreadcrumbItem } from "./BreadcrumbItem"

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  subcomponents: {
    BreadcrumbItem,
  },
} as ComponentMeta<typeof Breadcrumb>

const breadcrumbLinks = [
  {
    href: "#",
    label: "Home",
  },
  {
    href: "#",
    label: "About",
  },
  {
    href: "#",
    label: "Contact",
  },
]

const Template: Story<ComponentProps<typeof Breadcrumb>> = (args) => (
  <Breadcrumb {...args} />
)

export const Default = Template.bind({})

Default.args = {
  links: breadcrumbLinks,
}
