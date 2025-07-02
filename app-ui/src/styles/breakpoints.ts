import { mapValues } from 'lodash';

export const screenSizes = {
  xs: 480,
  s: 667,
  sm: 768,
  m: 1024,
  l: 1280,
  xl: 1320,
  xxl: 1680
};

export const breakpoints = mapValues(
  screenSizes,
  (size: number) => `@media (max-width: ${size}px)`
);

export const screenStandard = mapValues(screenSizes, (size: number) => `${size}px`);
