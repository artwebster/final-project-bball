import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FiMenu } from "react-icons/fi";
import Menu from "./Menu/Menu";

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <>
    <SpacerDiv />
    <Wrapper>
      <TopBar>
        <Title to={"/"}>TipOff</Title>
        <MenuButton onClick={() => setToggleMenu(!toggleMenu)}>
          <FiMenu style={{ fontSize: 30, color: "var(--font-color)" }} />
        </MenuButton>
      </TopBar>
      {toggleMenu && <Menu setToggleMenu={setToggleMenu} />}
    </Wrapper>
    </>
  );
};

const SpacerDiv = styled.div`
  height: 2rem;
  background-color: aliceblue;
`;

const Wrapper = styled.div`
  width: 35rem;
  position: fixed;
  background-color: var(--background-color);
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const Title = styled(Link)`
  font-weight: 700;
  font-size: 1.4rem;
  text-decoration: none;
  color: var(--font-color);
`;

const MenuButton = styled.button`
  background: none;
  border: none;
`;

export default Header;
