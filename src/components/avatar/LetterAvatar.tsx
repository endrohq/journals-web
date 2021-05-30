import React from 'react'

interface ContainerProps {
  initial_letter: string,
  className?: string,
  size: string,
  bg_class: string,
  img_type: string
}

export const LetterAvatar: React.FC<ContainerProps> = ({
  size,
  initial_letter,
  className,
  bg_class,
  img_type
}) => {
  const bg_size: number = getFontSize(size)
  const center = bg_size / 2
  return (
    <svg
      className={`${bg_class} ${className} ffm-bold br8 ${img_type}`}
      viewBox={`0 0 ${bg_size} ${bg_size}`}>
      <rect width="80%" height="80%" x="10%" y="10%" rx="2" ry="2" className="fill-white" />
      <text
        fontSize={center}
        y="55%"
        x="50%"
        className="fill-dgold"
        dominantBaseline="middle"
        textAnchor="middle">
        {initial_letter ? initial_letter.toUpperCase() : ''}
      </text>
    </svg>
  )
}

const getFontSize = (size: string) => {
  let clazz = 50
  switch (size) {
    case 'xs':
      clazz = 25
      break
    case 's':
      clazz = 30
      break
    case 'normal':
      clazz = 35
      break
    case 'm':
      clazz = 75
      break
    case 'l':
      clazz = 100
      break
    case 'xl':
      clazz = 125
      break
    default:
      clazz = 50
      break
  }
  return clazz
}
