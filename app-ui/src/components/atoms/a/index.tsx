import type { AnchorHTMLAttributes } from 'react';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  newTab?: boolean;
}

function A({ newTab, children, ...props }: LinkProps) {
  return (
    <a target={newTab ? '_blank' : undefined} rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

export default A;
