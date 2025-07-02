import React, { forwardRef } from 'react';

import theme from '@/styles/theme';

import * as S from './style';
import type { ButtonComponent, ButtonElement, ButtonProps } from './type';

function ButtonChildren({ iconLabel = '', icon, children }: Partial<ButtonProps>) {
  const IconNode = icon ? (
    <span className="button-icon" aria-label={iconLabel}>
      {icon}
    </span>
  ) : null;

  return (
    <>
      {IconNode}
      <span className="button-text">{children}</span>
    </>
  );
}

function Button(
  { size = 'md', color = theme.colors.primary, loading = false, ...rest }: ButtonProps,
  ref: React.ForwardedRef<ButtonElement>
) {
  const common = {
    ...rest,
    size,
    color,
    ref: ref as any
  };

  return (
    <S.ButtonStyled {...common} disabled={loading || rest.disabled}>
      {loading ? <S.LoadingSpinner loading={loading} /> : <ButtonChildren {...rest} />}
    </S.ButtonStyled>
  );
}

export default forwardRef(Button) as ButtonComponent;
