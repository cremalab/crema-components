import { ReactNode } from "react"
import { Button } from "../Button"
import { range } from "../../utils/range"
import styles from "./Pagination.module.css"

type OnPage = (event: React.MouseEvent<HTMLButtonElement>, page: number) => void

interface RenderItemProps {
  pageNumber: number
  onPage: OnPage
  disabled?: boolean
  label?: string
}
interface Props {
  currentPage: number
  totalPages: number
  onPage: OnPage
  renderPaginationControl?: (props: RenderItemProps) => ReactNode
  siblingCount?: number
}

function defaultrenderPaginationControl({
  pageNumber,
  onPage,
  disabled,
  label,
}: RenderItemProps): ReactNode {
  return (
    <Button
      className={styles.pageButton}
      ariaLabel={`Go to page ${pageNumber}`}
      key={pageNumber}
      onClick={(e) => onPage(e, pageNumber)}
      disabled={disabled}
    >
      {label || pageNumber.toString()}
    </Button>
  )
}

export function Pagination({
  currentPage,
  totalPages,
  onPage,
  renderPaginationControl = defaultrenderPaginationControl,
  siblingCount = 2,
}: Props) {
  const firstPage = 1
  const lastPage = totalPages
  const pageArray = range(firstPage, totalPages)
  const prevPages = pageArray
    .slice(0, currentPage - 1)
    .filter((x) => x !== firstPage)
    .slice(siblingCount > 0 ? -siblingCount : currentPage)
  const nextPages = pageArray
    .filter((x) => x !== lastPage)
    .slice(currentPage, pageArray.length)
    .slice(0, siblingCount)

  return (
    <div
      className={styles.paginationContainer}
      role="navigation"
      aria-label="pagination navigation"
    >
      {renderPaginationControl({
        pageNumber: currentPage - 1,
        onPage,
        disabled: currentPage === firstPage,
        label: "Previous",
      })}

      <div className={styles.pagesContainer}>
        {currentPage > firstPage &&
          renderPaginationControl({
            pageNumber: firstPage,
            onPage,
          })}

        {(siblingCount > 0
          ? prevPages[0] > firstPage + 1
          : currentPage > firstPage) && <span>...</span>}

        {prevPages.map((pageNumber) =>
          renderPaginationControl({ pageNumber, onPage }),
        )}

        <span className={styles.currentPage}>{currentPage.toString()}</span>

        {nextPages.map((pageNumber) =>
          renderPaginationControl({ pageNumber, onPage }),
        )}

        {lastPage > currentPage + siblingCount + 1 && <span>...</span>}

        {currentPage !== lastPage &&
          renderPaginationControl({ pageNumber: lastPage, onPage })}
      </div>

      {renderPaginationControl({
        pageNumber: currentPage + 1,
        onPage,
        disabled: currentPage === lastPage,
        label: "Next",
      })}
    </div>
  )
}
