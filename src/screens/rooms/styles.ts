import styled from 'styled-components/native'
import { Dimensions } from 'react-native'
import { Text } from '../../components/text'

const { width: screenWidth } = Dimensions.get('window')

export const Container = styled.View`
  flex: 1;
  padding: 16px;
`

export const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const Hero = styled.Image.attrs({
  resizeMode: 'contain'
})`
  flex: 1;

  max-height: ${screenWidth}px;
  aspect-ratio: 1;
`

export const Card = {
  Container: styled.TouchableOpacity`
    width: 100%;
    height: 70px;
    border-radius: 8px;
    padding: 0 16px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-width: 1px;
    border-color: #334155;
    margin: 16px 0;
  `,
  Aside: styled.View``,
}

export const RowLoadingView = styled.View`
  flex-direction: row;
  align-items: center;
`

export const Footer = styled.View`
  width: 100%;
  align-items: center;
  padding: 16px;
`