import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'

interface Props {
  message?: string
}

export const Loading: React.FC<Props> = ({ message }) => {
  const value = message || 'loading'
  return (
    <div className="loading">
      <span>{value}</span>
      <LoadingOutlined className="fs-xl" />
    </div>
  )
}
