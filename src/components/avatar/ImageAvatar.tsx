import React from 'react'

interface ContainerProps {
  url?: string,
  className?: string,
  bg_class: string,
  img_type: string
}

export const ImageAvatar: React.FC<ContainerProps> = ({ url, bg_class, img_type, className }) => {
  return (
    <img
      src={url}
      alt="avatar"
      className={`${bg_class} pos-rel img--cover ${img_type} ${className}`}
    />
  )
}
