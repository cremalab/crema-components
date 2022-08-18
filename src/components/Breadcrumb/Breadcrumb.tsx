import { ReactNode } from "react"
import styles from "./Breadcrumb.module.css"
import { BreadcrumbItem } from "./BreadcrumbItem"

export interface Link {
  href: string
  label: string
  onClick?: () => void
}

export type RenderItem = ({
  item,
  isCurrent,
  className,
}: {
  item: Link
  isCurrent: boolean
  className?: string
}) => ReactNode

interface Props {
  links: Link[]
  renderItem?: RenderItem
}

export const Breadcrumb = ({ links, renderItem }: Props) => {
  return (
    <nav aria-label="breadcrumbs" className={styles.container}>
      <ol>
        {links.map((link, index) => (
          <BreadcrumbItem
            key={index}
            link={link}
            renderItem={renderItem}
            isCurrent={index === links.length - 1}
          />
        ))}
      </ol>
    </nav>
  )
}
