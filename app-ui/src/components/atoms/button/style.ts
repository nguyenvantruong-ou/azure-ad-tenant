import { rgba } from 'polished';
import styled, { css, keyframes } from 'styled-components';

import theme from '@/styles/theme';
import type { ButtonProps, LoadingSpinnerProps } from './type';

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

export const ButtonStyled = styled.button<ButtonProps>`
  cursor: pointer;
  position: relative;
  ${({ color }) => css`
    border: 1px solid ${color};
    color: ${color};
  `}
  font-weight: 400;

  background: ${theme.colors.white} 0% 0% no-repeat padding-box;
  border-radius: 5px;
  text-align: center;
  transition: all 0.3s;
  display: flex;
  align-items: center;

  .button-icon {
    vertical-align: middle;
    margin-right: 8px;
    top: 0.125em;
    position: relative;
  }

  .button-text {
    vertical-align: middle;
  }

  ${({ block }) =>
    block &&
    css`
      width: 100%;
    `}

  ${({ size }) => {
    switch (size) {
      case 'xs':
        return css`
          font-size: ${theme.fontSizes.xs};
          padding: 6px 10px;
          svg {
            width: 10px;
          }
        `;
      case 'sm':
        return css`
          font-size: ${theme.fontSizes.sm};
          padding: 10px 14px;
          svg {
            width: 10px;
          }
        `;
      case 'md':
        return css`
          font-size: ${theme.fontSizes.md};
          padding: 16px 24px;
          svg {
            width: 16px;
          }
        `;
      case 'lg':
        return css`
          font-size: ${theme.fontSizes.lg};
          padding: 18px 26px;
          svg {
            width: 16px;
          }
        `;
      default:
        return null;
    }
  }}

  ${({ rounded }) =>
    rounded &&
    css`
      border-radius: 99px;
    `}

  &:disabled {
    cursor: default;
  }

  &.hvr-grow:hover {
    transform: scale(1.06);
  }

  ${({ primary, color = theme.colors.primary }) => {
    const disabledColor = rgba(color, 0.3);

    switch (true) {
      case primary:
        return css`
          background-color: ${color};
          color: ${theme.colors.white};
          box-shadow: 0px 5px 15px ${disabledColor};

          &:disabled {
            background: ${disabledColor} 0% 0% no-repeat padding-box;
            border: none;
          }
        `;
      default:
        return null;
    }
  }}
`;

export const LoadingSpinner = styled.div<LoadingSpinnerProps>`
  ${({ loading }) =>
    loading
      ? css`
          opacity: 1;
          transition-delay: '200ms';
        `
      : css`
      opacity:  0;
      transition-delay: : '0ms';
    `}

  border: 4px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  border-top-color: white;
  position: absolute;
  left: 25%;
  right: 25%;
  top: 25%;
  bottom: 25%;
  margin: auto;
  width: 16px;
  height: 16px;
  transition: opacity 200ms;
  animation: ${rotate} 1s linear;
  animation-iteration-count: infinite;
`;
