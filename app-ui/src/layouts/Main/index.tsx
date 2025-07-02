import { Outlet } from "react-router-dom";
import * as Styled from "./style"; 
const MainLayout = () => {
  return (
    <Styled.LayoutContainer>
      <Outlet />
    </Styled.LayoutContainer>
  );
};

export default MainLayout;
