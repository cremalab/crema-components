import { Ref, useCallback, useRef } from "react"
import { ButtonControlProps, NumberInputButton } from "./NumberInputButton"
import "./styles.css"

interface InputControlProps {
  ref: Ref<HTMLInputElement>
  type: "number"
  defaultValue?: number
  min?: number
  max?: number
  containerClassName?: string
}

type CustomButtonProps = ButtonControlProps & {
  buttonType?: "increment" | "decrement"
  "aria-label": "click to increase value" | "click to decrease value"
}

interface NumberInputProps extends Omit<InputControlProps, "ref" | "type"> {
  control: (props: InputControlProps) => JSX.Element
  incrementText?: string
  decrementText?: string
  customButton?: (
    props: ButtonControlProps,
    buttonType: CustomButtonProps["buttonType"],
  ) => JSX.Element
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
