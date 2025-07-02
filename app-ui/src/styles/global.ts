import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import { createGlobalStyle, css } from "styled-components";

// import nprogress from './libs/nprogress';
// import reactModal from './libs/react-modal';

const base = css`
  body {
    margin: 0;
    padding: 0;
    display: block;
    font-family: sans-serif;
  }
`;

export default createGlobalStyle`
  ${base}
`;
