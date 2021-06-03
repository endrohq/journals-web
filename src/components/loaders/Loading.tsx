import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'

interface Props {
    message?: string
}

export const Loading: React.FC<Props> = ({ message = 'loading' }) => {
    return (
        <div className="flex flex-column flex-c">
            {message && <div className="mb25">{message}</div>}
            <LoadingOutlined className="fs-xm" />
        </div>
    )
}
