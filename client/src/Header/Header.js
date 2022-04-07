import { useState } from "react";
import styled from "styled-components";
import { FiMenu } from "react-icons/fi";
import Menu from "../Menu/Menu";

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <Wrapper>
      <TopBar>
        <Title>TipOff</Title>
        <MenuButton onClick={() => setToggleMenu(!toggleMenu)}>
          <FiMenu size={30} />
        </MenuButton>
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
  font-size: 1.4rem;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
`;

export default Header;
