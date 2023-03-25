'use client'

import { useEffect, useRef, useState } from 'react'

const openingKeyframes = (elementHeight: number): Keyframe[] => {
  return [
    {
      height: 0,
      offset: 0,
    },
    {
      height: `${elementHeight}px`,
      offset: 0.999,
    },
    {
      height: 'auto',
      offset: 1,
    },
  ]
}

const closingKeyframes = (elementHeight: number): Keyframe[] => {
  ;[
    {
      height: 'auto',
      offset: 0,
    },
    {
      height: `${elementHeight}px`,
      offset: 0.001,
    },
    {
      height: 0,
      offset: 1,
    },
  ]
}

const option: KeyframeAnimationOptions = {
  duration: 300,
  easing: 'ease-out',
  fill: 'forwards',
}

export const useAccordion = () => {
  const accordionRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    const element = accordionRef.current
    if (element === null) return
    if (element.firstElementChild === null) return
    const elementHeight = element.clientHeight
    const elementChildHeight = element.firstElementChild.clientHeight

    if (isOpen) {
      element.animate(openingKeyframes(elementChildHeight), option)
    } else {
      if (elementHeight > 0) {
        element.animate(closingKeyframes(elementChildHeight), option)
      }
    }
  }, [isOpen])

  return {
    isOpen,
    setIsOpen,
    accordionRef,
  }
}
