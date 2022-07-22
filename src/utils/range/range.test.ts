import { range } from "./range"

describe("range", () => {
  it("returns an array with `size` number of entries", () => {
    const start = 1
    const size = 10

    const received = range(size, start)
    const expected = size

    expect(received.length).toEqual(expected)
  })

  it("returns an array of sequentially incrementing numbers", () => {
    const start = 1
    const size = 10

    const received = range(size, start)
    const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    expect(received).toEqual(expected)
  })

  it("uses `start` in the first position of returned array", () => {
    const start = 20
    const size = 5

    const received = range(size, start)
    const expected = start

    expect(received[0]).toEqual(expected)
  })
})
