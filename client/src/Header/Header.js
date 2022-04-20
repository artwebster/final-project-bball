import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FiMenu } from "react-icons/fi";
import Menu from "./Menu/Menu";
import tipoff from "../assets/title_caps.svg";
import { DataContext } from "../Hooks/DataContext";
import { AccountContext } from "../Hooks/AccountContext";
import dayjs from "dayjs";
import { ImNewspaper } from "react-icons/im";
import { IoIosBasketball, IoMdTrophy } from "react-icons/io";
import { FaListOl } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";

const Header = () => {
  const { setDate } = useContext(DataContext);
  const { userInfo, screenSize } = useContext(AccountContext);
  const [toggleMenu, setToggleMenu] = useState(false);

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
            {screenSize === "large" && (
              <>
                <LargeLink to={"/"}>SCORES</LargeLink>
                <LargeLink to={"/standings"}>STANDINGS</LargeLink>
                <LargeLink to={"/schedule"}>SCHEDULE</LargeLink>
                {userInfo ? (
                  <LargeLink to={"/account"}>MY ACCOUNT</LargeLink>
                ) : (
                  <LargeLink to={"/signin"}>SIGN IN</LargeLink>
                )}
              </>
            )}
            {screenSize === "medium" && (
              <>
                <MediumLink to={"/"}>
                  <IoIosBasketball />
                </MediumLink>
                <MediumLink to={"/news"}>
                  <ImNewspaper />
                </MediumLink>
                <MediumLink to={"/standings"}>
                  <FaListOl />
                </MediumLink>
                <MediumLink to={"/schedule"}>
                  <IoCalendarOutline />
                </MediumLink>
                <MediumLink to={"/fantasy"}>
                  <IoMdTrophy />
                </MediumLink>
                {userInfo ? (
                  <MediumLink to={"/account"}>
                    <MdAccountCircle />
                  </MediumLink>
                ) : (
                  <MediumLink to={"/signin"}>
                    <MdAccountCircle />
                  </MediumLink>
                )}
              </>
            )}
            {screenSize === "small" && (
              <>
                <MenuButton onClick={() => setToggleMenu(!toggleMenu)}>
                  <FiMenu
                    style={{ fontSize: 30, color: "var(--font-color)" }}
                  />
                </MenuButton>
              </>
            )}
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
  background-color: var(--base-color);
`;

const TopBar = styled.div`
  width: 95%;
  max-width: 1100px;
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

const LargeLink = styled(Link)`
  text-decoration: none;
  font-weight: 300;
  color: var(--font-color);
  margin: 0 15px;
`;

const MediumLink = styled(Link)`
  color: var(--font-color);
  margin: 0 15px;
`;

const Logo = styled.img`
  width: 100px;
`;

const MenuButton = styled.button``;

export default Header;
