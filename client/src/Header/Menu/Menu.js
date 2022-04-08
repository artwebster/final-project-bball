import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ColorContext } from "../../Hooks/ColorContext";

const Menu = ({setToggleMenu}) => {
  const { setTheme, theme } = useContext(ColorContext);
  const handleDarkMode = () => {
    theme === "light" ? setTheme("dark"): setTheme("light");
  };

  return (
    <Wrapper onClick={() => setToggleMenu(false)}>
      <SectionLink to={"/games"}>GAMES</SectionLink>
      <SectionLink to={"/news"}>NEWS</SectionLink>
      <SectionLink to={"/standings"}>STANDINGS</SectionLink>
      <SectionLink to={"/schedule"}>SCHEDULE</SectionLink>
      <SectionLink to={"/signin"}>SIGN IN</SectionLink>
      <DarkModeSelector><p>change mode:</p><DarkMode onClick={() => handleDarkMode()} /></DarkModeSelector>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 2.4rem;
  right: 0;
  display: flex;
  flex-direction: column;
  text-align: right;
  cursor: pointer;
  /* justify-content: flex-end; */
`;

const SectionLink = styled(Link)`
  background-color: var(--base-color);
  color: var(--inverse-base);
  text-decoration: none;
  font-weight: 700;
  &:hover {
    background-color: var(--background-color);
  }
  padding: 0.1rem 0.5rem;
`;

const DarkModeSelector = styled.div`
  width: 100%;
  background-color: var(--base-color);
  display: flex;
  justify-content: flex-end;
`;
const DarkMode = styled.div`
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
  background-color: var(--background-color);
`;


export default Menu;
