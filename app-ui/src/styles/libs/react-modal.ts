import { css } from 'styled-components';

export default css`
  .ReactModal__Overlay {
    position: fixed;
    inset: 0px;
    z-index: ${({ theme }) => theme.zIndexes.modal};
    padding-bottom: 0px;
    opacity: 0;
    transition: all 300ms ease-in-out;
  }

  .ReactModal__Overlay--after-open {
    opacity: 1;
    /* background-color: rgba(0, 0, 0, 0.35); */
  }

  .ReactModal__Overlay--before-close {
    opacity: 0;
  }

  .ReactModal__Content {
    display: flex;
    align-items: center;
    flex-direction: column;
    /* margin: 0 auto; */
    min-height: calc(100vh - (30px * 2));
    outline: none;
    opacity: 0;
    transition: all 300ms ease-in-out;
    height: 100%;
  }

  .ReactModal__Content--after-open {
    opacity: 1;
  }

  .ReactModal__Content--before-close {
    opacity: 0;
    transform: translateY(-80px);
  }

  /* Prevent body scrolling */
  .ReactModal__Body--open {
    overflow-y: hidden;
  }
`;
