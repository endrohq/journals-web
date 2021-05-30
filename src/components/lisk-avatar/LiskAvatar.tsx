import React from 'react'
import { BigNumber } from 'bignumber.js'
import { sha256 } from 'js-sha256'
import { Gradients, gradientSchemes } from './gradients';

const Rect = (props: any) => <rect {...props} />
const Circle = (props: any) => <circle {...props} />
const Polygon = (props: any) => <polygon {...props} />

const getBackgroundSize = (size: string) => {
  let newSize = 50
  switch (size) {
    case 'xs':
      newSize = 25
      break
    case 's':
      newSize = 30
      break
    case 'n':
      newSize = 50
      break
    case 'm':
      newSize = 75
      break
    case 'l':
      newSize = 100
      break
    case 'xl':
      newSize = 125
      break
    default:
      newSize = 50
      break
  }
  return newSize
}

const computeTriangle = (props: any) => ({
  points: [
    {
      x: props.x,
      y: props.y
    },
    {
      x: props.x + props.size,
      y: props.y + props.size / 4
    },
    {
      x: props.x + props.size / 4,
      y: props.y + props.size
    }
  ]
    .map(({ x, y }) => `${x},${y}`)
    .join(' ')
})

const computePentagon = (props: any) => ({
  points: [
    {
      x: props.x + props.size / 2,
      y: props.y
    },
    {
      x: props.x + props.size,
      y: props.y + props.size / 2.5
    },
    {
      x: props.x + (props.size - props.size / 5),
      y: props.y + props.size
    },
    {
      x: props.x + props.size / 5,
      y: props.y + props.size
    },
    {
      x: props.x,
      y: props.y + props.size / 2.5
    }
  ]
    .map(({ x, y }) => `${x},${y}`)
    .join(' ')
})

const getShape = (chunk: any, size: any, gradient: any, sizeScale = 1) => {
  const shapeNames = ['circle', 'triangle', 'square']

  const sizes = [1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1].map(
    x => x * size * sizeScale
  )

  const coordinates = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(
    x => x * (size / 40)
  )

  const shapes = {
    circle: {
      component: Circle,
      props: {
        cx: coordinates[chunk[1]] + sizes[chunk[3]] / 2,
        cy: coordinates[chunk[2]] + sizes[chunk[3]] / 2,
        r: sizes[chunk[3]] / 2
      }
    },
    square: {
      component: Rect,
      props: {
        x: coordinates[chunk[1]],
        y: coordinates[chunk[2]],
        height: sizes[chunk[3]],
        width: sizes[chunk[3]]
      }
    },
    rect: {
      component: Rect,
      props: {
        x: coordinates[chunk[1]],
        y: coordinates[chunk[2]],
        height: sizes[chunk[3]],
        width: sizes[chunk[4]]
      }
    },
    triangle: {
      component: Polygon,
      props: computeTriangle({
        x: coordinates[chunk[1]],
        y: coordinates[chunk[2]],
        size: sizes[chunk[3]]
      })
    },
    pentagon: {
      component: Polygon,
      props: computePentagon({
        x: coordinates[chunk[1]],
        y: coordinates[chunk[2]],
        size: sizes[chunk[3]]
      })
    }
  }

  return {
    component:
    shapes[shapeNames[chunk.substr(0, 2) % shapeNames.length]].component,
    props: {
      ...shapes[shapeNames[chunk.substr(0, 2) % shapeNames.length]].props,
      fill: gradient.url,
      transform: `rotate(${chunk.substr(1, 2) * 3.6}, ${size / 2}, ${size / 2})`
    }
  }
}

const getBackgroundCircle = (size: number, gradient: any) => ({
  component: Circle,
  props: {
    cx: size / 2,
    cy: size / 2,
    r: size / 2,
    fill: gradient.url
  }
})

const pickTwo = (chunk: any, options: any) => [
  options[chunk.substr(0, 2) % options.length],
  options[
  (chunk.substr(0, 2) - 0 + 1 + (chunk.substr(2, 2) % (options.length - 1))) %
  options.length
    ]
]

const getHashChunks = (address: string) => {
  const addressHash = new BigNumber(`0x${sha256(address)}`).toString().substr(3)
  return addressHash.match(/\d{5}/g)
}

interface ContainerProps {
  address: string,
  size: string,
}

export const LiskAvatar: React.FC<ContainerProps> = ({ address, size }) => {
  const sizeL = getBackgroundSize(size)
  const newSize = sizeL

  const addressHashChunks = getHashChunks(address)
  // @ts-ignore
  const gradientScheme = gradientSchemes[addressHashChunks[0].substr(1, 2) % gradientSchemes.length]
  const primaryGradients = pickTwo(addressHashChunks[1], gradientScheme.primary)
  const secondaryGradients = pickTwo(
    addressHashChunks[2],
    gradientScheme.secondary
  )
  const shapes = [
    getBackgroundCircle(newSize, primaryGradients[0]),
    getShape(addressHashChunks[1], newSize, primaryGradients[1], 1),
    getShape(addressHashChunks[2], newSize, secondaryGradients[0], 0.23),
    getShape(addressHashChunks[3], newSize, secondaryGradients[1], 0.18)
  ]
  return (
    <svg
      height={newSize}
      width={newSize}
      className="accountVisual"
      xmlns="http://www.w3.org/2000/svg">
      <Gradients scheme={gradientScheme} />
      {shapes.map((shape, i) => (
        <shape.component {...shape.props} key={i} />
      ))}
    </svg>
  )
}
