"use client";;
import styled, { keyframes } from 'styled-components';

const auroraAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const AuroraWrapper = styled.span`
  background: linear-gradient(
    45deg,
    #ff3366,
    #ff6b6b,
    #4ecdc4,
    #45b7d1,
    #2caeba,
    #a166ab,
    #ff3366
  );
  background-size: 300% 300%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: ${auroraAnimation} 5s ease infinite;
  font-weight: bold;
`;

export const AuroraText = ({ children }) => {
  return <AuroraWrapper>{children}</AuroraWrapper>;
};
