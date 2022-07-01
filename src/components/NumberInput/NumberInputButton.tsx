import { ReactNode, useCallback, useEffect, useState } from "react"

export interface ButtonControlProps {
  onMouseLeave: () => void
  onMouseUp: () => void
  onMouseDown: () => void
  onClick: () => void
  children?: ReactNode
}

interface NumberInputButtonProps {
  action: () => void
  control: (props: ButtonControlProps) => JSX.Element
}

export function NumberInputButton({
  action,
  control: Button,
}: NumberInputButtonProps) {
  const [hold, setHold] = useState(false)

  const onPress = useCallback(() => {
    setHold(true)
  }, [])

  const onRelease = useCallback(() => {
    setHold(false)
  }, [])

  useEffect(() => {
    if (!hold) {
      return
    }

    const holdInterval = setInterval(action, 100)

    return () => {
      clearInterval(holdInterval)
    }
  }, [hold, action])

  return (
    <Button
      onMouseLeave={onRelease}
      onMouseUp={onRelease}
      onMouseDown={onPress}
      onClick={action}
    />
  )
}
