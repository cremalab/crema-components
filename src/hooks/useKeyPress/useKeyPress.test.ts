import { renderHook } from "@testing-library/react-hooks"
import userEvent from "@testing-library/user-event"
import { useKeyPress } from "./"

describe("useKeyPress", () => {
  it("calls the callback function when the key is pressed", async () => {
    const callback = jest.fn()
    renderHook(() => useKeyPress(["Enter"], callback))

    await userEvent.keyboard("{enter}")

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it("does not call the callback function when the key is not pressed", async () => {
    const callback = jest.fn()
    renderHook(() => useKeyPress(["Enter"], callback))

    await userEvent.keyboard("{esc}")

    expect(callback).not.toHaveBeenCalled()
  })
})
