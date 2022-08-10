import { Placement } from "@popperjs/core"

const basePlacement = ["top", "bottom", "left", "right", "auto"] as const
const startPlacement = basePlacement.map(
  (placement) => `${placement}-start` as const,
)
const endPlacement = basePlacement.map(
  (placement) => `${placement}-end` as const,
)

// while @popperjs/core has its own placements array, in some cases the export is undefined, specifically within a testing environment
export const placements: Placement[] = [
  ...basePlacement,
  ...startPlacement,
  ...endPlacement,
]
