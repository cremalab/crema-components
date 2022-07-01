interface Props {
  className?: string
  label: string
  inputLabelId: string
  uid: string
}

export function InputLabel({ className, uid, inputLabelId, label }: Props) {
  return (
    <label id={inputLabelId} htmlFor={uid} className={className}>
      {label}
    </label>
  )
}
