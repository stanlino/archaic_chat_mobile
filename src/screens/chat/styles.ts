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

    margin: 8px 0;
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
    overflow: hidden;

    min-height: 40px;
    justify-content: center;

    border-radius: 20px;
    
    background-color: gray;

    margin-left: 5px;
    margin-right: 5px;
  `,
  Reply: styled.TouchableOpacity`
    background-color: #000;
    padding: 4px 8px;
  `,
  ReplyUsername: styled(Text)`
    font-size: 12px;
    text-align: left;
    font-weight: bold;
  `,
  ReplyMessage: styled(Text)`
    font-size: 12px;
    text-align: left;
  `,
  ReplyIndicatorView: styled.View`
    width: 40px; 
    height: 100%;
    justify-content: center;
    align-items: center;
  `,
  ReplyIndicatorIcon: styled(MaterialIcons)`
    color: #fff;
    font-size: 28px;
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
    color: #fff;
    padding: 8px;
  `,
}

export const Footer = {
  Container: styled.View`
    width: 100%;
  `,
  Connected: styled.View`
    flex-direction: row;
    align-items: flex-end;
  `,
  Disconected: styled.View`
    flex-direction: row;
    justify-content: center;
    padding: 16px 0;
  `,
  Content: styled.View`
    flex: 1;
    max-height: 160px;
    min-height: 50px;
  `,
  ReplyedMessage: styled.View`
    width: 100%;
    background-color: #ffff;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    padding: 8px;
  `,
  ReplyedMessageUsername: styled(Text)`
    font-size: 14px;
    text-align: left;
    font-weight: bold;
  `,
  ReplyedMessageText: styled(Text)`
    font-size: 14px;
    text-align: left;
    color: #000;
  `,
  Input: styled(Input).attrs({
    multiline: true,
    numberOfLines: 4,
  })`
    max-height: 100px;
    border-radius: 25px;
    padding: 12px 16px;
    border-width: 0;
  `,
  Button: styled(Button)`
    min-width: 50px;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    margin-left: 8px;
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