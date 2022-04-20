import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { AccountContext } from "../Hooks/AccountContext";

const Account = () => {
  const { userInfo, setUserInfo } = useContext(AccountContext);
  const history = useHistory();

  if (!userInfo)
    return (
      <div>
        Please <Link to={"/signin"}>click here</Link> to sign in.
      </div>
    );

  const handleSignOut = () => {
    setUserInfo(null);
    history.push("/signin");
  };

  return (
    <Wrapper>
      <Container>
        <h1>Welcome, {userInfo.username}!</h1>
        <Link to={"/pickem"}>Make Picks</Link>
        <Link to={"/fantasy"}>View Leaderboard</Link>
        <Button onClick={handleSignOut}>Sign out</Button>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
`;

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  > * {
    margin: 5px 0;
  }
`;

const Button = styled.button`
  width: 5rem;
  height: 2.5rem;
  display: block;
  font-size: 0.8rem;
  background-color: #8b0000;
  border-radius: 10px;
  padding: 5px 10px;
  margin: 15px;
`;

export default Account;
