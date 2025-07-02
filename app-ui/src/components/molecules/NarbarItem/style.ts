import theme from "@/styles/theme";
import styled from "styled-components";

export const Icon = styled.div`
  border-radius: 50%;
  height: 80px;
  width: 80px;
  background-color: #d8e3e7;
  align-items: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const Text = styled.p`
  clear: both;
  font-weight: 400;
  text-align: center;
  width: 100px;
`;

export const Container = styled.div`
  float: left;
  margin: 0 15px;

  &:hover {
    ${Icon} {
      background: ${theme.colors.primary};
      color: ${theme.colors.white};
    }

    ${Text} {
      color: ${theme.colors.greyShade};
    }
  }
`;

export const Link = styled.a`
  color: #041e42;
  text-decoration: none;
  display: flex;
  align-items: center;
  flex-direction: column;
`;


