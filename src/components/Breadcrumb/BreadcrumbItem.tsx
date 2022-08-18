import { Link, RenderItem } from "./Breadcrumb"
import styles from "./Breadcrumb.module.css"

export interface BreadcrumbItemProps {
  isCurrent: boolean
  link: Link
  renderItem?: RenderItem
}

export const BreadcrumbItem = ({
  isCurrent,
  link,
  renderItem,
}: BreadcrumbItemProps) => {
  const ariaCurrent = isCurrent ? "page" : undefined

  return (
    <li className={styles.listItem}>
      {renderItem ? (
        renderItem({ item: link, isCurrent, className: styles.listItem })
      ) : (
        <a
          href={link.href}
          aria-current={ariaCurrent}
          className={styles.listItem}
        >
          {link.label}
        </a>
      )}
      {!isCurrent && <span aria-hidden="true">/</span>}
    </li>
  )
}
