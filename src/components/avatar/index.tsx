import React from 'react'
import { ImageAvatar } from './ImageAvatar'
import { LetterAvatar } from './LetterAvatar'

interface ContainerProps {
  url?: string,
  className?: string,
  size: string,
  type: string,
  label: string
}

export const Avatar: React.FC<ContainerProps> = ({ url, className = '', size, type, label }) => {
  const bg_class = getBackgroundSize(size)
  const img_type =
    type === 'rounded' ? ' br8 ' : type === 'circle' ? 'circle' : ''
  if (url) {
    return (
      <ImageAvatar
        className={className}
        img_type={img_type}
        bg_class={bg_class}
        url={url}
      />
    )
  }
  const initial_letter = label ? label.substring(0, 1) : ''
  return (
    <div className={`${bg_class}`}>
      <LetterAvatar
        size={size}
        img_type={img_type}
        bg_class={bg_class}
        className={className}
        initial_letter={initial_letter}
      />
    </div>
  )
}

const getBackgroundSize = (size: string) => {
  let clazz;
  switch (size) {
    case 'xs':
      clazz = 'img--25'
      break
    case 's':
      clazz = 'img--30'
      break
    case 'n':
      clazz = 'img--50'
      break
    case 'm':
      clazz = 'img--75'
      break
    case 'l':
      clazz = 'img--100'
      break
    case 'xl':
      clazz = 'img--125'
      break
    case 'xxl':
      clazz = 'img--150'
      break
    case 'xxxl':
      clazz = 'img--200'
      break
    default:
      clazz = 'img--50'
      break
  }
  return clazz
}
