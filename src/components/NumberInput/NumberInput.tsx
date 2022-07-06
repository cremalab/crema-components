import { Ref, useCallback, useMemo, useRef } from "react"
import { ButtonControlProps, NumberInputButton } from "./NumberInputButton"
import "./styles.css"

interface InputControlProps {
  ref: Ref<HTMLInputElement>
  type: "number"
  defaultValue?: number
  value?: number
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
}

type CustomButtonProps = ButtonControlProps & {
  buttonType?: "increment" | "decrement"
  "aria-label": "click to increase value" | "click to decrease value"
}

export interface NumberInputProps
  extends Omit<InputControlProps, "ref" | "type"> {
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
  /** Use a custom element for the buttons. */
  button?: (
    props: ButtonControlProps,
    buttonType: CustomButtonProps["buttonType"],
  ) => JSX.Element
  /** The interval number in ms
   * @default
   * 100*/
  acceleration?: number
  /** An onChange callback that will return the current numerical value */
  onChange?: (value: number) => void
}

const getDefaultValue = (min: number, defaultValue?: number) => {
  return defaultValue ?? (min !== -Infinity ? min : 0)
}

export function NumberInput({
  control,
  incrementText = "+",
  decrementText = "-",
  defaultValue,
  value,
  min = -Infinity,
  max = Infinity,
  button,
  containerClassName,
  step,
  acceleration,
  onChange,
  testID,
}: NumberInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const increment = useCallback(() => {
    if (Number(inputRef.current?.value) < max) {
      inputRef.current?.stepUp()
      onChange?.(Number(inputRef.current?.value) ?? 0)
    }
  }, [max, onChange])

  const decrement = useCallback(() => {
    if (Number(inputRef.current?.value) > min) {
      inputRef.current?.stepDown()
      onChange?.(Number(inputRef.current?.value) ?? 0)
    }
  }, [min, onChange])

  const InputProps: InputControlProps = useMemo(
    () => ({
      defaultValue: getDefaultValue(min, defaultValue),
      value,
      min,
      max,
      type: "number",
      ref: inputRef,
      step,
      "data-testid": testID,
    }),
    [min, max, defaultValue, step, testID, value],
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

  const ButtonElement = (props: CustomButtonProps) => {
    const propsOverride = { ...props }
    delete propsOverride["buttonType"]
    if (button) {
      return button(propsOverride, props.buttonType)
    } else {
      return <button {...propsOverride} />
    }
  }

  return (
    <div className={containerClassName}>
      <NumberInputButton
        acceleration={acceleration}
        control={(props) => (
          <ButtonElement
            {...props}
            buttonType="decrement"
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
            buttonType="increment"
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
