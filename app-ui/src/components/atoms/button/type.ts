import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  rounded?: boolean;
  primary?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  iconLabel?: string;
  block?: boolean;
  color?: string;
}

export interface LoadingSpinnerProps {
  loading: boolean;
}

export type ButtonElement = HTMLButtonElement | HTMLAnchorElement;

export type ButtonPropsWithRef = ButtonProps & React.RefAttributes<ButtonElement>;

export type ButtonComponent = React.ForwardRefExoticComponent<ButtonPropsWithRef>;
