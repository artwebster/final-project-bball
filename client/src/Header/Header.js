import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FiMenu } from "react-icons/fi";
import Menu from "./Menu/Menu";
import tipoff from "../assets/title_caps.svg";
import { DataContext } from "../Hooks/DataContext";
import { AccountContext } from "../Hooks/AccountContext";
import dayjs from "dayjs";

const Header = () => {
  const { setDate } = useContext(DataContext);
  const { userInfo } = useContext(AccountContext);
  const [toggleMenu, setToggleMenu] = useState(false);

  console.log("header render");


  return (
    <>
      <SpacerDiv />
      <Wrapper>

          <TopBar>
            <Title
              to={{
                pathname: "/",
                state: { fromLogo: true },
              }}
              onClick={() => setDate(dayjs())}
            >
              <Logo src={tipoff} />
            </Title>
            <RightDiv>
              {userInfo && (
                <ProfileLink to={"/account"}>
                  Welcome, {userInfo.username}
                </ProfileLink>
              )}
              <MenuButton onClick={() => setToggleMenu(!toggleMenu)}>
                <FiMenu style={{ fontSize: 30, color: "var(--font-color)" }} />
              </MenuButton>
            </RightDiv>
          {toggleMenu && <Menu setToggleMenu={setToggleMenu} />}
          </TopBar>

      </Wrapper>
    </>
  );
};

const SpacerDiv = styled.div`
  height: 3.5rem;
`;

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 3.5rem;
  /* background-color: var(--background-color); */
  background-color: black;
`;


const TopBar = styled.div`
  width: 95%;
  max-width: 1024px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: 3.5rem;
  padding: 0rem 0.6rem;
`;

const RightDiv = styled.div`
  display: flex;
  align-items: center;
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

const ProfileLink = styled(Link)`
  text-decoration: none;
`;

const MenuButton = styled.button``;

export default Header;
