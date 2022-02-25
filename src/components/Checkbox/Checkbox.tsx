import { ChangeEvent, HTMLProps } from "react"

export interface Props extends HTMLProps<HTMLInputElement> {
  className?: string
  disabled?: boolean
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void
  id?: string
  isChecked?: boolean
  label?: string
  value?: string
}
export const Checkbox = ({
  className,
  disabled,
  label,
  handleChange,
  id,
  isChecked,
  value,
  ...inputProps
}: Props) => {
  return (
    <div>
      <input
        aria-label={label}
        checked={isChecked}
        disabled={disabled}
        onChange={handleChange}
        id={id}
        type="checkbox"
        value={value}
        {...inputProps}
      />
      <label className={className} htmlFor={label}>
        {label}
      </label>
    </div>
  )
}
