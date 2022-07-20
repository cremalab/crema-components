import { ReactNode } from "react"
import { Button } from "../Button"
import styles from "./Pagination.module.css"

interface Props {
  currentPage: number
  totalPages: number
  onPage: (event: React.MouseEvent<HTMLButtonElement>, page: number) => void
  renderPageItem?: (props: {
    pageNumber: number
    onPage: (
      event: React.MouseEvent<HTMLButtonElement>,
      pageNumber: number,
    ) => void
    label?: string
    disabled?: boolean
  }) => ReactNode
  siblingCount?: number
}

interface RenderItemProps {
  pageNumber: number
  onPage: (
    event: React.MouseEvent<HTMLButtonElement>,
    pageNumber: number,
  ) => void
  disabled?: boolean
  label?: string
}

function defaultRenderPageItem({
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
  renderPageItem,
  siblingCount = 2,
}: Props) {
  const pageArray = new Array(totalPages).fill(1).map((_, i) => i + 1)
  const firstPage = 1
  const lastPage = totalPages
  const prevPages = pageArray
    .slice(0, currentPage - 1)
    .filter((x) => x !== firstPage)
    .slice(siblingCount > 0 ? -siblingCount : currentPage)
  const nextPages = pageArray
    .filter((x) => x !== lastPage)
    .slice(currentPage, pageArray.length)
    .slice(0, siblingCount)

  const renderPageFunction = renderPageItem
    ? renderPageItem
    : defaultRenderPageItem

  return (
    <div
      className={styles.paginationContainer}
      role="navigation"
      aria-label="pagination navigation"
    >
      {renderPageFunction({
        pageNumber: currentPage - 1,
        onPage,
        disabled: currentPage === firstPage,
        label: "Previous",
      })}

      <div className={styles.pagesContainer}>
        {currentPage > firstPage &&
          renderPageFunction({
            pageNumber: firstPage,
            onPage,
          })}

        {(siblingCount > 0
          ? prevPages[0] > firstPage + 1
          : currentPage > firstPage) && <span>...</span>}

        {prevPages.map((pageNumber) =>
          renderPageFunction({ pageNumber, onPage }),
        )}

        <span className={styles.currentPage}>{currentPage.toString()}</span>

        {nextPages.map((pageNumber) =>
          renderPageFunction({ pageNumber, onPage }),
        )}

        {lastPage > currentPage + siblingCount + 1 && <span>...</span>}

        {currentPage !== lastPage &&
          renderPageFunction({ pageNumber: lastPage, onPage })}
      </div>

      {renderPageFunction({
        pageNumber: currentPage + 1,
        onPage,
        disabled: currentPage === lastPage,
        label: "Next",
      })}
    </div>
  )
}
