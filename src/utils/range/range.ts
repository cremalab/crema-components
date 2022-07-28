/**
 * range
 * ------------------------------------------------
 * Returns an array of `startAt` to `startAt + size`
 * e.g. range(1, 5) == [1, 2, 3, 4, 5]
 */

export function range(size: number, startAt = 0) {
  return Array.from({ length: size }).map((_, index) => index + startAt)
}
