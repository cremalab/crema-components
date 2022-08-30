import { renderHook } from "@testing-library/react-hooks"
import userEvent from "@testing-library/user-event"
import { useOutsideClick } from "./"

describe("useOutsideClick", () => {
  it("should call the handler when clicking outside the element", async () => {
    const callback = jest.fn()
    const ref = { current: document.createElement("div") }

    renderHook(() => useOutsideClick(ref, callback))

    await userEvent.click(document.body)

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it("should not call the handler when clicking inside the element", async () => {
    const callback = jest.fn()
    const ref = { current: document.createElement("div") }

    renderHook(() => useOutsideClick(ref, callback))

    await userEvent.click(ref.current)

    expect(callback).not.toHaveBeenCalled()
  })

  it("should not call the handler when ref.current is null", async () => {
    const callback = jest.fn()
    const ref = { current: null }

    renderHook(() => useOutsideClick(ref, callback))

    await userEvent.click(document.body)

    expect(callback).not.toHaveBeenCalled()
  })
})
