import React, { useEffect, useState } from 'react';

const fallback = '/images/fallback.png'

interface ContainerProps {
  src: string
  alt?: string
}

export const Image: React.FC<ContainerProps> = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [displayImage, setDisplayImage] = useState<any>();
  const [imageSource, setImageSource] = useState<any>(false);

  useEffect(() => {
    handleInitialTimeout();
    setDisplayImage(new window.Image());
  })

  useEffect(() => {
    setIsLoaded(false);
    if (fallback) {
      handleInitialTimeout()
    }
    setImage(src, [fallback]);

  }, [src]);

  function handleInitialTimeout () {
    if (250 && 250 > 0) {
      setTimeout(() => {
        if (!isLoaded) {
          setImageSource(fallback);
        }
      }, 250)
    } else {
      setImageSource(fallback);
    }
  }

  function setImage(image: any, fallbacks: string[]) {

    const imagesArray = [image].concat(fallbacks).filter(fallback => !!fallback)
    this.displayImage.onerror = () => {
      if (imagesArray.length > 2 && typeof imagesArray[1] === 'string') {
        const updatedFallbacks = imagesArray.slice(2)
        setImage(imagesArray[1], updatedFallbacks);
        return;
      }
      setIsLoaded(true);
      setImageSource(imagesArray[1] || null);
    }
    displayImage.onload = () => {
      setIsLoaded(true);
      setImageSource(imagesArray[0]);
    }
    if (typeof imagesArray[0] === 'string') {
      this.displayImage.src = imagesArray[0]
    } else {
      setImageSource(imagesArray[0]);
    }
  }

  return typeof imageSource === 'string' ? (
    <img
      src={imageSource}
      alt={alt || ''}
    />
  ) : imageSource

}
