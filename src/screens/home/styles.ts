import { Dimensions } from 'react-native'
import styled from 'styled-components/native'

const { width: screenWidth } = Dimensions.get('window')

export const Container = styled.View`
  flex: 1;

  align-items: center;
  justify-content: space-between;

  padding: 16px;
`

export const Hero = styled.Image.attrs({
  resizeMode: 'contain'
})`
  flex: 1;

  margin: 16px 0;

  max-height: ${screenWidth}px;
  aspect-ratio: 1;
`

export const Footer = styled.View`
  width: 100%;
`