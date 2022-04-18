import styled from "styled-components";
import { useContext } from "react";
import { AccountContext } from "../Hooks/AccountContext";
import { useHistory } from "react-router-dom";
import { DataContext } from "../Hooks/DataContext";
import { useEffect } from "react";
import Loading from "../Loading";

const Fantasy = () => {
  const { userInfo } = useContext(AccountContext);
  const { leaderboard, getLeaderboard } = useContext(DataContext);
  const history = useHistory();
  const buttonText = userInfo ? "Go to my picks" : "Sign in to make picks!";
  const lbArray = [];

  useEffect(() => {
    getLeaderboard();
  }, []);

  const handleClick = () => {
    userInfo ? history.push("/pickem") : history.push("/signin");
  };

  if (leaderboard) {
    for (const player in leaderboard) {
      lbArray.push([player, leaderboard[player]]);
    }
    lbArray.sort((a, b) => b[1] - a[1]);
  }

  return (
    <Wrapper>
      <Container>
        <Header>
          <h1>Fantasy</h1>
        </Header>
        <MainDiv>
          <Button onClick={handleClick}>{buttonText}</Button>
          {leaderboard ? (
            <LeaderboardDiv>
              {lbArray.map((player, index) => {
                return (
                  <PlayerDiv className={player[0] === userInfo.username ? "user" : "none"}>
                    <span>{index+1}</span>
                    <span>
                      {player[0]}
                    </span>
                    <span>
                      {player[1]}
                    </span>
                  </PlayerDiv>
                );
              })}
            </LeaderboardDiv>
          ) : (
            <Loading />
          )}
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

const LeaderboardDiv = styled.div`
.user {
    font-weight: 700;
  }
`;

const PlayerDiv = styled.div`
  display: flex;
  > span {
    margin: 2px 10px;
  }
`;

export default Fantasy;
