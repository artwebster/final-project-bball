import styled from "styled-components";
import dayjs from "dayjs";
import * as TEAM from "../data/constants";
import Loading from "../Loading";
import { useContext } from "react";
import { DataContext } from "../Hooks/DataContext";

const SingleGame = ({
  gameData,
  selectedGame,
  currentGame,
  index,
  handleGameClick,
}) => {
  const { liveScores } = useContext(DataContext);

  let focus = gameData.gameId === selectedGame ? true : false;
  let status = "F";

  if (!gameData) return <Loading />;

  if (liveScores?.[gameData.id_sdb_event]) {
    const { homeScore, awayScore, quarter, progress } =
      liveScores[gameData.id_sdb_event];
    gameData.awayScore = awayScore;
    gameData.homeScore = homeScore;
    status =
      quarter.slice(0, 1) === "Q"
        ? `${12 - Number(progress)}:00 - ${quarter}`
        : quarter;
  }

  let awayTeam = gameData.awayTeam.abbr || gameData.awayTeam;
  let homeTeam = gameData.homeTeam.abbr || gameData.homeTeam;

  return (
    <Wrapper onClick={() => handleGameClick(gameData.gameId, index)}>
      <GameDiv focus={focus}>
        <Teams>
          {TEAM[awayTeam]?.location} at {TEAM[homeTeam]?.location}
        </Teams>
        <Score>
          {gameData.awayScore} - {gameData.homeScore}
        </Score>
        <Status>{status}</Status>
      </GameDiv>
      {focus && <div>EXTRA STATS GO HERE</div>}
    </Wrapper>
  );
};

const Wrapper = styled.button`
  width: 100%;
  border: 1px solid pink;
`;

const GameDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: ${({ focus }) => (focus ? `var(--highlight-color)` : "none")};
`;

const Teams = styled.div`
  width: 55%;
  text-align: left;
  border: 1px solid yellow;
`;

const Score = styled.div`
  width: 100px;
`;

const Status = styled.div`
  width: 100px;
  border: 1px solid green;
`;

export default SingleGame;
