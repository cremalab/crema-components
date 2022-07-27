# `<Pagination />`

A component to help a user navigate a list of pages.

- Buttons for the first and last pages are always rendered
- Each page item renders a button that fires `onPage` with event and page arguments
- Custom page items can be rendered with `renderPageItem` (this includes previous/next buttons)
- Current page's sibling page visibility can be controlled with `siblingCount`

| Prop                                                           | Type   | Description                                                                 |
| -------------------------------------------------------------- | ------ | --------------------------------------------------------------------------- |
| currentPage                                                    | number | sets active page number                                                     |
| totalPages                                                     | number | number of total pages                                                       |
| onPage(event, pageNumber)                                      | func   | function called on click                                                    |
| renderPaginationControl({pageNumber, onPage, label, disabled}) | func   | render prop to support custom components                                    |
| siblingCount (default: 2)                                      | number | number of items to display on either side of currentPage (where applicable) |

## Directory Structure

- `Pagination.stories.tsx`: Component stories (`npm run test:playground`)
- `Pagination.test.tsx`: Component tests (`npm run test:unit`)
- `Pagination.tsx`: Component code
- `index.ts`: Component export
- `README.md`: Component documentation (hey, that's me!)
