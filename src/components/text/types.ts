import { TextProps } from 'react-native'

export interface TextContainerProps extends TextProps {
  heading?: boolean;
  subtext?: boolean;
}