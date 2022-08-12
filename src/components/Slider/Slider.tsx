import { ChangeEvent } from "react"
import "./Slider.css"

export interface SliderProps {
  min: number
  max: number
  onChange: (E: ChangeEvent<HTMLInputElement>) => void
  value: number
}

export function Slider({ min, max, onChange, value }: SliderProps) {
  return (
    <section className="range">
      <form className="slider">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={onChange}
        />
      </form>
    </section>
  )
}
