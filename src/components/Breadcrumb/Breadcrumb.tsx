import { ReactNode } from "react"
import styles from "./Breadcrumb.module.css"
import { BreadcrumbItem } from "./BreadcrumbItem"

export interface Link {
  href: string
  label: string
  onClick?: () => void
}

export interface LinkElement {
  renderItem?: ({
    item,
    isCurrent,
  }: {
    item: Link
    isCurrent: boolean
  }) => ReactNode
}

interface Props {
  links: Link[]
  linkElement?: LinkElement
}

export const Breadcrumb = ({ links, linkElement }: Props) => {
  return (
    <nav aria-label="breadcrumbs" className={styles.container}>
      <ol className={styles.list}>
        {links.map((link, index) => (
          <BreadcrumbItem
            key={index}
            link={link}
            isCurrent={index === links.length - 1}
            linkElement={linkElement}
          />
        ))}
      </ol>
    </nav>
  )
}
