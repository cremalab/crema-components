import { ReactElement } from "react"
import styles from "./Breadcrumb.module.css"
import { BreadcrumbItem, LinkProps } from "./BreadcrumbItem"

interface Props {
  children: Array<ReactElement<LinkProps>>
}

export function Breadcrumb({ children }: Props) {
  return (
    <nav aria-label="breadcrumbs" className={styles.BreadcrumbContainer}>
      <ol className={styles.BreadcrumbList}>
        {children.map((item, index, array) => (
          <BreadcrumbItem
            key={index}
            {...item.props}
            isCurrent={array.length - 1 === index}
          />
        ))}
      </ol>
    </nav>
  )
}
