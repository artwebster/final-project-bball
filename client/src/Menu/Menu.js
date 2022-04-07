import styled from "styled-components";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <Wrapper>
      <SectionLink to={"/games"}>GAMES</SectionLink>
      <SectionLink to={"/news"}>NEWS</SectionLink>
      <SectionLink to={"/standings"}>STANDINGS</SectionLink>
      <SectionLink to={"/schedule"}>SCHEDULE</SectionLink>
      <SectionLink to={"/signin"}>SIGN IN</SectionLink>
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
  /* justify-content: flex-end; */
`;

const SectionLink = styled(Link)``;

export default Menu;
