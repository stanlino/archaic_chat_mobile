import styled from 'styled-components/native'
import { MaterialIcons } from '@expo/vector-icons';

import { Button } from '../../components/button'
import { Input } from '../../components/input'
import { Text } from '../../components/text'

export const Container = styled.View`
  flex: 1;
  padding: 8px;
`

export const SystemMessage = {
  View: styled.View`
    width: 100%;
    
    align-items: center;
    justify-content: center;

    margin: 5px 0;
  `,
  Text: styled(Text)`
    font-size: 12px;
    color: #999;
  `,
}

export const UserMessage = {
  Container: styled.View``,
  Content: styled.View`
    flex-direction: row;
    align-items: flex-end;
  `,
  View: styled.View`
    min-width: 80px;
    max-width: 80%;

    min-height: 40px;
    justify-content: center;
    padding: 8px;

    border-radius: 20px;
    
    background-color: rgba(0, 0, 0, 0.2);

    margin-left: 5px;
    margin-right: 5px;
  `,
  Name: styled(Text)`
    font-size: 12px;
    margin-bottom: 2px;
    margin-left: 45px;
  `,
  Avatar: styled.View`
    width: 100%;
    max-width: 40px;
    aspect-ratio: 1;
    border-radius: 20px;
    background-color: #999;
  `,
  Text: styled(Text)`
    text-align: left;
  `,
}

export const Footer = {
  Container: styled.View`
    width: 100%;
  `,
  Connected: styled.View`
    flex-direction: row;
    justify-content: center;
  `,
  Disconected: styled.View`
    flex-direction: row;
    justify-content: center;
    padding: 16px 0;
  `,
  Input: styled(Input)`
    flex: 1;
    margin-right: 5px;
  `,
  Button: styled(Button)`
    width: 56px;
    min-width: 56px;
  `,
  Icon: styled(MaterialIcons)`
    color: #fff;
    font-size: 28px;
  `,
  ActivityIndicator: styled.ActivityIndicator.attrs({
    color: '#ea580c',
  })`
    margin-right: 8px;
  `,
  LoadingText: styled(Text)``,
}