import styled from "styled-components";
import { useContext } from "react";
import { ColorContext } from "../../Hooks/ColorContext";
import { AccountContext } from "../../Hooks/AccountContext";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useHistory } from "react-router-dom";

const Menu = ({ setToggleMenu }) => {
  const { setTheme, theme } = useContext(ColorContext);
  const { userInfo } = useContext(AccountContext);
  const history = useHistory();

  const handleDarkMode = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  const handleClick = (ev) => {
    setToggleMenu(false);
    console.log("ev target value", ev.target.value);
    history.push(`${ev.target.value}`);
  };

  return (
    <>
      <Wrapper>
        <SectionLink value={"/"} onClick={(ev) => handleClick(ev)}>
          GAMES
        </SectionLink>
        <SectionLink value={"/news"} onClick={(ev) => handleClick(ev)}>
          NEWS
        </SectionLink>
        <SectionLink value={"/standings"} onClick={(ev) => handleClick(ev)}>
          STANDINGS
        </SectionLink>
        <SectionLink value={"/schedule"} onClick={(ev) => handleClick(ev)}>
          SCHEDULE
        </SectionLink>
        <SectionLink value={"/fantasy"} onClick={(ev) => handleClick(ev)}>
          FANTASY
        </SectionLink>
        {userInfo ? (
          <SectionLink value={"/account"} onClick={(ev) => handleClick(ev)}>
            MY ACCOUNT
          </SectionLink>
        ) : (
          <SectionLink value={"/signin"} onClick={(ev) => handleClick(ev)}>
            SIGN IN
          </SectionLink>
        )}
        <DarkModeSelector>
          <DarkMode onClick={() => handleDarkMode()}>
            {theme === "dark" ? <MdDarkMode /> : <MdLightMode />}
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
  z-index: 3;
`;

const Wrapper = styled.div`
  position: absolute;
  top: 3.4rem;
  right: 0.4rem;
  display: flex;
  flex-direction: column;
  text-align: right;
  z-index: 4;
  width: 7.5rem;
  cursor: pointer;
`;

const SectionLink = styled.button`
  background-color: var(--inbetween-color);
  color: var(--inverse-base);
  text-decoration: none;
  font-weight: 700;
  text-align: right;
  &:hover {
    background-color: var(--secondary-color);
  }
  padding: 0.4rem 0.5rem;
`;

const DarkModeSelector = styled.div`
  width: 100%;
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
`;

export default Menu;
