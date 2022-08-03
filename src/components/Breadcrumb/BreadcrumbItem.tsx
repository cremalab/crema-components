import styles from './Breadcrumb.module.css';

interface ItemProps {
  href: string;
  isCurrent: boolean;
  label: string;
}

interface Props {
  items: ItemProps[];
}

export function BreadcrumbItem({ items }: Props) {
  return (
    <>
      {items.map((item, index) => (
        <li className={styles.BreadcrumbListItem} key={index}>
          <a href={item.href} className={styles.link} aria-current={item.isCurrent ? "page" : "false"}>
            {item.label}
          </a>
          {!item.isCurrent && <span role="presentation" className={styles.Separator}>/</span>}
        </li>
      ))}
    </>
  )
}