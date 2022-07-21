export function range(startAt = 0, size: number) {
  return Array.from({ length: size }).map((_, index) => index + startAt)
}
