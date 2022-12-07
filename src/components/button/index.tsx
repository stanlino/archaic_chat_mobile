import { TouchableOpacityProps } from 'react-native'

import {
  Container
} from './styles'

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode
}

export function Button({ children, ...rest }: ButtonProps){
  return (
    <Container {...rest}>
      {children}
    </Container>
  )
}