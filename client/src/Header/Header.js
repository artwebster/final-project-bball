import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FiMenu } from "react-icons/fi";
import Menu from "./Menu/Menu";
import tipoff from "../assets/title_caps.svg";

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <>
    <SpacerDiv/>
    <Wrapper>
      <TopBar>
        <Title to={"/"}><Logo src={tipoff} /></Title>
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
  height: 3.5rem;
`;

const Wrapper = styled.div`
  width: 35rem;
  position: fixed;
  background-color: var(--background-color);
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: 3.5rem;
`;

const Title = styled(Link)`
  font-weight: 700;
  font-size: 1.4rem;
  text-decoration: none;
  color: var(--font-color);
`;

const Logo = styled.img`
  width: 100px;
`;

const MenuButton = styled.button`
`;

export default Header;
