import { HTMLProps, ReactNode, Ref, forwardRef } from "react"
import { InputHelperText } from "./InputHelperText"
import { InputLabel } from "./InputLabel"

export interface TextInputProps extends HTMLProps<HTMLInputElement> {
  className?: string
  disabled?: boolean
  helperText?: ReactNode
  hideLabel?: boolean
  id?: string
  inputRef?: Ref<HTMLInputElement>
  label?: string
  name: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const TextInput = forwardRef<HTMLDivElement, TextInputProps>(
  function TextInput(
    {
      className,
      disabled,
      helperText,
      hideLabel,
      id,
      inputRef,
      label,
      name,
      type = "text",
      ...inputProps
    }: TextInputProps,
    ref,
  ) {
    const uid = id ?? name
    const inputLabelId = `${uid}-label`
    const helperTextId = `${uid}-helper-text`

    const inputAriaAttributes: Record<string, unknown> = {}

    inputAriaAttributes["aria-label"] = label

    if (helperText) {
      inputAriaAttributes["aria-describedby"] = helperTextId
    }

    return (
      <div ref={ref}>
        {label && !hideLabel ? (
          <InputLabel label={label} uid={uid} inputLabelId={inputLabelId} />
        ) : null}
        <div>
          <input
            className={className}
            disabled={disabled}
            type={type}
            name={name}
            ref={inputRef}
            id={uid}
            {...inputAriaAttributes}
            {...inputProps}
          />
        </div>
        <InputHelperText helperText={helperText} helperTextId={helperTextId} />
      </div>
    )
  },
)
