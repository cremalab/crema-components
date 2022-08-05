# `<Tooltip />`

A simple tooltip component for displaying non-interactive descriptive text that is anchored to its child element. Supports keyboard accessibility.

## Directory Structure

- `Tooltip.stories.tsx`: Component stories (`npm run test:playground`)
- `Tooltip.test.tsx`: Component tests (`npm run test:unit`)
- `Tooltip.tsx`: Component code
- `index.ts`: Component export
- `README.md`: Component documentation (hey, that's me!)
- `placements.ts`: Exports an array of all possible tooltip placements

## Example Usage

Basic Usage

```tsx
<Tooltip label="World">Hello</Tooltip>
```

For advance use cases, explore the Tooltip stories in our storybook.

## API

| Prop                | Type      | Required | Description                    | Default |
| ------------------- | --------- | -------- | ------------------------------ | ------- |
| `children`          | ReactNode | yes      | the anchor element             |         |
| `label`             | string    | yes      | the tooltip text               |         |
| `distance`          | number    | no       | distance from anchor           | 10      |
| `skidding`          | number    | no       | vertical/horizontal alignment  | 0       |
| `showArrow`         | boolean   | no       | a tooltip with an arrow        |         |
| `alwaysShow`        | boolean   | no       | tooltip always shown           |         |
| `hideOnClick`       | boolean   | no       | onClick hides tooltip          |         |
| `enterDelay`        | number    | no       | entry delay in ms              |         |
| `exitDelay`         | number    | no       | exit delay in ms               |         |
| `placement`         | string    | no       | positioning relative to anchor | "auto"  |
| `animationDuration` | number    | no       | duration in ms                 | 300     |
| `ariaDescribedBy`   | string    | no       | link anchor and tooltip id     | 300     |

## Food for thought from MDN

### Accessibility Concerns

If the information is important enough for a tooltip, isn't it important enough to always be visible?

### Best Practices

Instead of using tooltips and hiding important information, consider writing clear, succinct, always visible descriptions. If you have space, don't use tooltips or toggletips. Just provide clear labels and sufficient body text.
