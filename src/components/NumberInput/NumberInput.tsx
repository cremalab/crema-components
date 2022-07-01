import { Ref, useCallback, useRef } from "react"
import { ButtonControlProps, NumberInputButton } from "./NumberInputButton"
import "./styles.css"

interface InputControlProps {
  ref: Ref<HTMLInputElement>
  type: "number"
  defaultValue?: number
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
}

type CustomButtonProps = ButtonControlProps & {
  buttonType?: "increment" | "decrement"
  "aria-label": "click to increase value" | "click to decrease value"
}

export interface NumberInputProps
  extends Omit<InputControlProps, "ref" | "type"> {
  /** The input to render. It must by an element of type 'input'. */
  control: (props: InputControlProps) => JSX.Element
  /** Override the default incrementText. If your using customButton and pass it children, this text will be overriden by its children.*/
  incrementText?: string
  /** Override the default decrementText. If your using customButton and pass it children, this text will be overriden by its children.*/
  decrementText?: string
  /** Use a custom element for the buttons. */
  customButton?: (
    props: ButtonControlProps,
    buttonType: CustomButtonProps["buttonType"],
  ) => JSX.Element
  /** The interval number in ms
   * @default
   * 100*/
  acceleration?: number
}

export function NumberInput({
  control,
  incrementText = "+",
  decrementText = "-",
  defaultValue,
  min = -Infinity,
  max = Infinity,
  customButton,
  containerClassName,
  step,
  acceleration,
}: NumberInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const increment = useCallback(() => {
    if (Number(inputRef.current?.value) < max) inputRef.current?.stepUp()
  }, [max])

  const decrement = useCallback(() => {
    if (Number(inputRef.current?.value) > min) inputRef.current?.stepDown()
  }, [min])

  const InputElement = control({
    defaultValue: defaultValue ?? (min !== -Infinity ? min : 0),
    min,
    max,
    type: "number",
    ref: inputRef,
    step,
  })

  if (InputElement.type !== "input") {
    throw new Error(
      "'control' only accepts functions that return elements of type 'input'",
    )
  }

  const ButtonElement = (props: CustomButtonProps) => {
    const propsOverride = { ...props }
    delete propsOverride["buttonType"]
    if (customButton) {
      return customButton(propsOverride, props.buttonType)
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
