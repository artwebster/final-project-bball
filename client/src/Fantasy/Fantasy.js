import styled from "styled-components";
import { useContext } from "react";
import { AccountContext } from "../Hooks/AccountContext";
import { useHistory } from "react-router-dom";

const Fantasy = () => {
    const { userInfo } = useContext(AccountContext);
    const history = useHistory();

    const buttonText = (userInfo) ? "Go to my picks" : "Sign in to make picks!";

    const handleClick = () => {
        (userInfo) ? history.push("/pickem") : history.push("/signin");
    }

  return (
    <Wrapper>
      <Container>
        <Header>
          <h1>Fantasy</h1>
        </Header>
        <MainDiv>
            <Button onClick={handleClick}>{buttonText}</Button>
        </MainDiv>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;

const Container = styled.div`
  width: 35rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainDiv = styled.div``;
const Button = styled.button``;

export default Fantasy;
