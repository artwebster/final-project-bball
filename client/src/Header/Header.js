import styled from "styled-components";
import { useState } from "react";
import Menu from "../Menu/Menu";

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <Wrapper>
      <TopBar>
        <Title>TipOff</Title>
        <MenuButton onClick={() => setToggleMenu(!toggleMenu)}>Menu</MenuButton>
      </TopBar>
      {toggleMenu && <Menu />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 34rem;
  position: fixed;
`;

const TopBar = styled.div`
 display: flex;
  justify-content: space-between;
  position: relative;
`;

const Title = styled.p`
  font-weight: 700;
`;

const MenuButton = styled.button``;

export default Header;
