import styles from "./Breadcrumb.module.css"
import { BreadcrumbItem, LinkProps } from "./BreadcrumbItem"

interface Props {
  links: LinkProps[]
}

export const Breadcrumb = ({ links }: Props) => {
  return (
    <nav aria-label="breadcrumbs" className={styles.BreadcrumbContainer}>
      <ol className={styles.BreadcrumbItem}>
        {links.map((link, index) => (
          <BreadcrumbItem
            key={index}
            {...link}
            isCurrent={index === links.length - 1}
          />
        ))}
      </ol>
    </nav>
  )
}
