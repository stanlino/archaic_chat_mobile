import React from 'react'

import { TextContainer } from './styles'
import { TextContainerProps } from './types'

export function Text({ children, ...rest }: TextContainerProps){
  return (
    <TextContainer {...rest}>
      {children}
    </TextContainer>
  )
}