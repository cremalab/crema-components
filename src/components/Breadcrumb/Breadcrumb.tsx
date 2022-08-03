import { ReactNode } from 'react';
import styles from './Breadcrumb.module.css';

interface Props {
  children: ReactNode;
}

export function Breadcrumb({ children }: Props) {
  return (
    <nav aria-label="breadcrumb" className={styles.BreadcrumbContainer}>
      <ol className={styles.BreadcrumbList}>
        {children}
      </ol>
    </nav>
  )
}
