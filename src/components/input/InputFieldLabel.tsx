import React from 'react'

interface Props {
  label: string
  error: string
  remainingChars: number
}

export const InputFieldLabel: React.FC<Props> = ({ label, error, remainingChars = null }) => {
  if (!label && !remainingChars) {
    return <></>
  }
  const extra = error ? (
    <span className="create--error color-dr fs-s">{error}</span>
  ) : (
    <span className="fs-s">{remainingChars}</span>
  )
  return (
    <div className="flex flex-ai-c flex-jc-sb mb5">
      {label ? (
        <label className="fs-s color-lb">
          {(label || '').charAt(0).toUpperCase() + label.slice(1)}
        </label>
      ) : (
        <span />
      )}
      {extra}
    </div>
  )
}
