import styles from "./Breadcrumb.module.css"

interface LinkProps {
  href: string
  isCurrent: boolean
  label: string
}

interface Props {
  links: LinkProps[]
}

export function BreadcrumbItem({ links }: Props) {
  return (
    <>
      {links.map((link, index) => (
        <li className={styles.BreadcrumbListItem} key={index}>
          <a
            href={link.href}
            className={styles.link}
            aria-current={link.isCurrent ? "page" : "false"}
          >
            {link.label}
          </a>
          {!link.isCurrent && (
            <span aria-hidden="true" className={styles.Separator}>
              /
            </span>
          )}
        </li>
      ))}
    </>
  )
}
