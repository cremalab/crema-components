import { Link } from "@reach/router"
import { action } from "@storybook/addon-actions"
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

export const WithButtons = Template.bind({})

WithButtons.args = {
  links: breadcrumbLinks,
  linkElement: {
    renderItem: ({ item }) => (
      <button onClick={action("onClick")}>{item.label}</button>
    ),
  },
}

export const WithRouterLinks = Template.bind({})

WithRouterLinks.args = {
  links: breadcrumbLinks,
  linkElement: {
    renderItem: ({ item, isCurrent }) => (
      <Link to={item.href} aria-current={isCurrent} onClick={action("onClick")}>
        {item.label}
      </Link>
    ),
  },
}
