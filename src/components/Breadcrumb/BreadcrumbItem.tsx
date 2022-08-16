import styles from "./Breadcrumb.module.css"

export interface LinkProps {
  href: string
  label: string
  isCurrent?: boolean
}

export const BreadcrumbItem = ({ href, isCurrent, label }: LinkProps) => {
  const ariaCurrent = isCurrent ? "page" : undefined

  return (
    <li className={styles.BreadcrumbItem}>
      <a href={href} className={styles.link} aria-current={ariaCurrent}>
        {label}
      </a>
      {!isCurrent && (
        <span aria-hidden="true" className={styles.Separator}>
          /
        </span>
      )}
    </li>
  )
}
