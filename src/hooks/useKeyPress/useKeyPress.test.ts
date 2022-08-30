import { renderHook } from "@testing-library/react-hooks"
import userEvent from "@testing-library/user-event"
import { useKeyPress } from "./"

describe("useKeyPress", () => {
  it("returns the expected key press", async () => {
    const callback = jest.fn()
    const { result } = renderHook(() => useKeyPress(["Enter"], callback))

    await userEvent.keyboard("{enter}")

    expect(result.current.keyPressed).toBe("Enter")
  })

  it("calls the callback function when the key is pressed", async () => {
    const callback = jest.fn()
    renderHook(() => useKeyPress(["Enter"], callback))

    await userEvent.keyboard("{enter}")

    expect(callback).toHaveBeenCalledTimes(1)
  })
})
