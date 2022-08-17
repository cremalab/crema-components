import { Link, LinkElement } from "./Breadcrumb"
import styles from "./Breadcrumb.module.css"

export interface BreadcrumbItemProps {
  isCurrent: boolean
  link: Link
  linkElement?: LinkElement
}

export const BreadcrumbItem = ({
  isCurrent,
  link,
  linkElement,
}: BreadcrumbItemProps) => {
  const ariaCurrent = isCurrent ? "page" : undefined

  return (
    <li className={styles.list}>
      {linkElement?.renderItem ? (
        linkElement.renderItem({ item: link, isCurrent })
      ) : (
        <a href={link.href} aria-current={ariaCurrent}>
          {link.label}
        </a>
      )}
      {!isCurrent && <span aria-hidden="true">/</span>}
    </li>
  )
}
