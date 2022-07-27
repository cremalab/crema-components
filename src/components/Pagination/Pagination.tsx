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

type RenderPaginationNavigator = (props: RenderItemProps) => ReactNode

interface PaginationProps {
  totalPages: number
  siblingCount?: number
  firstPage?: number
  currentPage: number
}

interface Props extends PaginationProps {
  onPage: OnPage
  renderPaginator?: RenderPaginationNavigator
}

interface Paginator {
  pageNumber?: number
  type: PaginatorElementTypes
  disabled?: boolean
  label?: string
}

interface PaginatorComponentProps extends Paginator {
  renderPaginator: RenderPaginationNavigator
  onPage: OnPage
}

enum PaginatorElementTypes {
  SEPARATOR = "separator",
  CURRENT = "current",
  PAGINATOR = "paginator",
}

type PaginatorElementConfig = {
  content: JSX.Element | ReactNode
}

function defaultrenderPaginator({
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

function generatePaginators({
  firstPage = 1,
  currentPage,
  totalPages,
  siblingCount = 2,
}: PaginationProps): Paginator[] {
  // Previous Pages
  const prevPagesStart =
    currentPage - siblingCount <= firstPage + 1
      ? firstPage + 1
      : currentPage - siblingCount

  const prevPagesSize =
    currentPage - siblingCount <= firstPage
      ? currentPage - firstPage - 1
      : siblingCount

  const prevPages = range(prevPagesSize, prevPagesStart)

  // Next Pages
  const nextPagesStart = currentPage + 1

  const nextPagesSize =
    currentPage + siblingCount >= totalPages
      ? totalPages - currentPage - 1
      : siblingCount

  const nextPages = range(nextPagesSize, nextPagesStart)

  // Separators
  const hasPrevSeparator =
    siblingCount > 0
      ? prevPages[0] > firstPage + 1
      : currentPage > firstPage && currentPage > firstPage + 1

  const hasNextSeparator = totalPages > currentPage + siblingCount + 1

  return [
    // Previous Button
    {
      pageNumber: currentPage - 1,
      type: PaginatorElementTypes.PAGINATOR,
      disabled: currentPage <= firstPage,
      label: "Previous",
    },
    // First Page
    ...(currentPage > firstPage
      ? [{ pageNumber: firstPage, type: PaginatorElementTypes.PAGINATOR }]
      : []),
    // Previous separator
    ...(hasPrevSeparator ? [{ type: PaginatorElementTypes.SEPARATOR }] : []),
    // Previous Pages
    ...prevPages.map((p) => ({
      pageNumber: p,
      type: PaginatorElementTypes.PAGINATOR,
    })),
    // Current Page
    { pageNumber: currentPage, type: PaginatorElementTypes.CURRENT },
    // Next Pages
    ...nextPages.map((p) => ({
      pageNumber: p,
      type: PaginatorElementTypes.PAGINATOR,
    })),
    // Next separator
    ...(hasNextSeparator ? [{ type: PaginatorElementTypes.SEPARATOR }] : []),
    // Last Page
    ...(currentPage === totalPages
      ? []
      : [{ pageNumber: totalPages, type: PaginatorElementTypes.PAGINATOR }]),
    // Next Button
    {
      pageNumber: currentPage + 1,
      type: PaginatorElementTypes.PAGINATOR,
      disabled: currentPage >= totalPages,
      label: "Next",
    },
  ]
}

const PaginatorComponent = ({
  type,
  pageNumber = 0,
  renderPaginator,
  onPage,
  label,
  disabled,
}: PaginatorComponentProps) => {
  const componentConfig: Record<PaginatorElementTypes, PaginatorElementConfig> =
    {
      [PaginatorElementTypes.SEPARATOR]: { content: <span>...</span> },
      [PaginatorElementTypes.CURRENT]: {
        content: <span className={styles.currentPage}>{pageNumber}</span>,
      },
      [PaginatorElementTypes.PAGINATOR]: {
        content: renderPaginator({
          pageNumber,
          onPage,
          label,
          disabled,
        }),
      },
    }

  return <>{componentConfig[type].content}</>
}

export function Pagination({
  firstPage = 1,
  currentPage,
  totalPages,
  onPage,
  renderPaginator = defaultrenderPaginator,
  siblingCount = 2,
}: Props) {
  if (!totalPages) {
    return null
  }
  const paginators = generatePaginators({
    firstPage,
    currentPage,
    siblingCount,
    totalPages,
  })
  return (
    <div
      className={styles.paginationContainer}
      role="navigation"
      aria-label="pagination navigation"
    >
      <div className={styles.pagesContainer}>
        {paginators.map((paginator, index) => (
          <PaginatorComponent
            key={`${paginator.type}:${index}`}
            {...paginator}
            renderPaginator={renderPaginator}
            onPage={onPage}
          />
        ))}
      </div>
    </div>
  )
}
