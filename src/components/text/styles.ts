import styled, { css } from "styled-components/native";

import { TextContainerProps } from "./types";

export const TextContainer = styled.Text<TextContainerProps>`

  font-family: Poppins_400Regular;
  font-size: 16px;
  line-height: 24px;

  color: #dbdbdb;

  text-align: center;

  ${({ heading }) => heading && css`
    font-family: Poppins_700Bold;
    font-size: 24px;
    line-height: 32px;

    color: #ffffff;
  `}
  
  ${({ subtext }) => subtext && css`
    font-family: Poppins_400Regular;
    font-size: 14px;
    line-height: 20px;

    color: #c7c7c7;
  `}
`