import { Placement } from "@popperjs/core"

const basePlacement = ["top", "bottom", "left", "right", "auto"]
const startPlacement = basePlacement.map((placement) => `${placement}-start`)
const endPlacement = basePlacement.map((placement) => `${placement}-end`)

// while @popperjs/core has its own placements array, in some cases the export is undefined, specifically within a testing environment

export const placements = [
  ...basePlacement,
  ...startPlacement,
  ...endPlacement,
] as Placement[]
