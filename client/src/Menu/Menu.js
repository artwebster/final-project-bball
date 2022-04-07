import styled from "styled-components";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <Wrapper>
      <SectionLink to={"/games"}>Scores</SectionLink>
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

const SectionLink = styled(Link)`
  background-color: var(--base-color);
  color: var(--inverse-base);
  text-decoration: none;
  font-weight: 700;
  padding: 0.1rem 0.5rem;
`;

export default Menu;
