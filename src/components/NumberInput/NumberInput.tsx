import { ChangeEvent, Ref, useCallback, useMemo, useRef } from "react"
import { ButtonControlProps, NumberInputButton } from "./NumberInputButton"
import "./styles.css"

interface InputControlProps {
  ref: Ref<HTMLInputElement>
  type: "number"
  value?: string
  step?: number
  /**The minimum number allowed.
   *  @default
   * -Infinity
   * */
  min?: number
  /**The minimum number allowed.
   *  @default
   * Infinity
   * */
  max?: number
  containerClassName?: string
  testID?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

type CustomButton = (props: ButtonControlProps) => JSX.Element

type CustomButtonProps = ButtonControlProps & {
  button?: CustomButton
  "aria-label": "click to increase value" | "click to decrease value"
}

const ButtonElement = (props: CustomButtonProps) => {
  const propsOverride = { ...props }
  delete propsOverride["button"]
  if (props.button) {
    return props.button(propsOverride)
  } else {
    return <button {...propsOverride} />
  }
}

export interface NumberInputProps
  extends Omit<InputControlProps, "ref" | "type" | "onChange"> {
  /** The custom input to render. It must by an element of type 'input'. */
  control?: (props: InputControlProps) => JSX.Element
  /** Override the default incrementText. If your using customButton and pass it children, this text will be overriden by its children.
   * @default
   * "+" */
  incrementText?: string
  /** Override the default decrementText. If your using customButton and pass it children, this text will be overriden by its children.
   * @default
   * "-" */
  decrementText?: string
  /** Use a custom element for the increment action. */
  incrementButton?: CustomButton
  /** Use a custom element for the decrement action. */
  decrementButton?: CustomButton
  /** The interval number in ms
   * @default
   * 100*/
  acceleration?: number
  /** An onChange callback that will return the current numerical value */
  onChange?: (value?: string) => void
}

export function NumberInput({
  control,
  incrementText = "+",
  decrementText = "-",
  value,
  min = -Infinity,
  max = Infinity,
  incrementButton,
  decrementButton,
  containerClassName,
  step,
  acceleration,
  onChange,
  testID,
}: NumberInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value)
    },
    [onChange],
  )

  const increment = useCallback(() => {
    const currentValue = inputRef.current?.value
    if (Number(currentValue) < max) {
      inputRef.current?.stepUp()
      onChange?.(currentValue)
    }
  }, [max, onChange])

  const decrement = useCallback(() => {
    const currentValue = inputRef.current?.value
    if (Number(currentValue) > min) {
      inputRef.current?.stepDown()
      onChange?.(currentValue)
    }
  }, [min, onChange])

  const InputProps: InputControlProps = useMemo(
    () => ({
      value: value ? value : min !== -Infinity ? String(min) : "0",
      min,
      max,
      type: "number",
      ref: inputRef,
      step,
      "data-testid": testID,
      onChange: handleChange,
    }),
    [min, max, step, testID, value, handleChange],
  )

  const InputElement = useMemo(
    () => (control ? control(InputProps) : <input {...InputProps} />),
    [control, InputProps],
  )

  if (InputElement.type !== "input") {
    throw new Error(
      "'control' only accepts functions that return elements of type 'input'",
    )
  }

  return (
    <div className={containerClassName}>
      <NumberInputButton
        acceleration={acceleration}
        control={(props) => (
          <ButtonElement
            {...props}
            button={decrementButton}
            aria-label="click to decrease value"
          >
            {props.children ?? decrementText}
          </ButtonElement>
        )}
        action={decrement}
      />
      {InputElement}
      <NumberInputButton
        acceleration={acceleration}
        control={(props) => (
          <ButtonElement
            {...props}
            button={incrementButton}
            aria-label="click to increase value"
          >
            {props.children ?? incrementText}
          </ButtonElement>
        )}
        action={increment}
      />
    </div>
  )
}
