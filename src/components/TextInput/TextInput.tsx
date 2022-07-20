import { HTMLProps, ReactNode, Ref, forwardRef } from "react"
import { InputHelperText } from "./InputHelperText"
import { InputLabel } from "./InputLabel"

interface TextInputProps extends HTMLProps<HTMLInputElement> {
  helperText?: ReactNode
  hideLabel?: boolean
  inputRef?: Ref<HTMLInputElement>
  name: string
}

export const TextInput = forwardRef<HTMLDivElement, TextInputProps>(
  function TextInput(
    { helperText, hideLabel, inputRef, name, ...inputProps }: TextInputProps,
    ref,
  ) {
    const uid = name
    const inputLabelId = `${uid}-label`
    const helperTextId = `${uid}-helper-text`

    const inputAriaAttributes: Record<string, unknown> = {}

    inputAriaAttributes["aria-label"] = inputProps?.label

    if (helperText) {
      inputAriaAttributes["aria-describedby"] = helperTextId
    }

    return (
      <div ref={ref}>
        {inputProps?.label && !hideLabel ? (
          <InputLabel
            label={inputProps?.label}
            uid={uid}
            inputLabelId={inputLabelId}
          />
        ) : null}
        <div>
          <input
            name={name}
            ref={inputRef}
            {...inputAriaAttributes}
            {...inputProps}
          />
        </div>
        {helperText && (
          <InputHelperText
            helperText={helperText}
            helperTextId={helperTextId}
          />
        )}
      </div>
    )
  },
)
