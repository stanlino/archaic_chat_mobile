import React from 'react'

import { TextContainer } from './styles'
import { TextContainerProps } from './types'

interface TextProps extends TextContainerProps {
  children?: React.ReactNode
}

export function Text({ children, ...rest }: TextProps){
  return (
    <TextContainer {...rest}>
      {children}
    </TextContainer>
  )
}