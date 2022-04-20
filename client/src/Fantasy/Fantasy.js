import styled from "styled-components";
import { useContext, useEffect } from "react";
import { AccountContext } from "../Hooks/AccountContext";
import { DataContext } from "../Hooks/DataContext";
import Loading from "../Loading";
import { Link } from "react-router-dom";

const Fantasy = ({ refComp }) => {
  const { userInfo, screenSize } = useContext(AccountContext);
  const { leaderboardY, leaderboard, getLeaderboard } = useContext(DataContext);
  const lbArray = [];

  useEffect(() => {
    getLeaderboard();
  }, []);

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
          <h1>FANTASY</h1>
        </Header>
        <MainDiv>
          <TopMsg>
            {userInfo ? (
              <Link to={"/pickem"}>Go to my picks</Link>
            ) : (
              <Link to={"/signin"}>Sign in to make picks!</Link>
            )}
          </TopMsg>
          {leaderboard ? (
            <LeaderboardDiv>
              <Headers>
                <span className="col-1">
                  <h6>{refComp === true ? "" : "Rank"}</h6>
                </span>
                <span className="col-2">
                  <h6>Username</h6>
                </span>
                <span className="col-3">
                  <h6>Total</h6>
                </span>
                <span className="col-4">
                  <h6>{refComp === true ? "Y" : "Yesterday"}</h6>
                </span>
              </Headers>
              {lbArray.map((player, index) => {
                return (
                  <PlayerDiv
                    refComp={refComp}
                    key={player[0]}
                    className={`
                      ${player[0] === userInfo?.username ? "user" : "none"}
                      ${index % 2 === 0 ? "even" : "odd"}
                    `}
                  >
                    <span className="col-1">{index + 1}</span>
                    <span className="col-2">{player[0]}</span>
                    <span className="col-3">{player[1]}</span>
                    <span className="col-4">
                      {leaderboardY[player[0]] || "0"}
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
  padding: 0.5rem 0;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 0.8rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TopMsg = styled.div`
  margin: 15px;
  font-size: 0.9rem;
  text-align: center;
`;

const MainDiv = styled.div``;

const LeaderboardDiv = styled.div`
  .user {
    font-weight: 700;
    color: gold;
  }
  .col-1 {
    width: 15%;
    text-align: center;
  }
  .col-2 {
    width: 50%;
  }
  .col-3 {
    width: 15%;
    text-align: center;
  }
  .col-4 {
    width: 20%;
    text-align: center;
  }
  .even {
    background-color: var(--secondary-color);
  }
`;

const Headers = styled.div`
  width: 100%;
  display: flex;
  padding: 5px 0;
  background-color: var(--news-top);
`;

const PlayerDiv = styled.div`
  display: flex;
  font-size: ${({ refComp }) => (refComp ? "0.7rem" : "1rem")};
`;

export default Fantasy;
