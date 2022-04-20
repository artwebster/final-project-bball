import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ColorContext } from "../../Hooks/ColorContext";
import { AccountContext } from "../../Hooks/AccountContext";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const Menu = ({ setToggleMenu }) => {
  const { setTheme, theme } = useContext(ColorContext);
  const { userInfo } = useContext(AccountContext);
  const handleDarkMode = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <>
    <Wrapper>
      <SectionLink to={"/games"}>GAMES</SectionLink>
      <SectionLink to={"/news"}>NEWS</SectionLink>
      <SectionLink to={"/standings"}>STANDINGS</SectionLink>
      <SectionLink to={"/schedule"}>SCHEDULE</SectionLink>
      <SectionLink to={"/fantasy"}>FANTASY</SectionLink>
      {userInfo ? (
        <SectionLink to={"/account"}>MY ACCOUNT</SectionLink>
      ) : (
        <SectionLink to={"/signin"}>SIGN IN</SectionLink>
      )}
      <DarkModeSelector>
        <DarkMode onClick={() => handleDarkMode()}>
        {(theme === "dark") ? <MdDarkMode />:<MdLightMode />}
        </DarkMode>
      </DarkModeSelector>
    
    </Wrapper>
    <Modal onClick={() => setToggleMenu(false)} />
    </>
  );
};

const Modal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(55, 55, 55, 0.2);
  /* z-index: 200; */
`;

const Wrapper = styled.div`
  position: absolute;
  top: 3.4rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  text-align: right;
  z-index: 2;
  cursor: pointer;
  /* justify-content: flex-end; */
`;

const SectionLink = styled(Link)`
  background-color: var(--inbetween-color);
  color: var(--inverse-base);
  text-decoration: none;
  font-weight: 700;
  &:hover {
    background-color: var(--secondary-color);
  }
  padding: 0.4rem 0.5rem;
`;

const DarkModeSelector = styled.div`
  width: 100%;
  /* background-color: var(--base-color); */
  background-color: var(--inbetween-color);
  &:hover {
    background-color: var(--secondary-color);
  }
  display: flex;
  justify-content: flex-end;
`;

const DarkMode = styled.button`
  width: 1.8rem;
  height: 1.8rem;
  /* background-color: var(--background-color); */
`;

export default Menu;
