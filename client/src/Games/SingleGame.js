import styled from "styled-components";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import * as TEAM from "../data/constants";
import Loading from "../Loading";
import { useContext } from "react";
import { DataContext } from "../Hooks/DataContext";

const SingleGame = ({
  gameData,
  selectedGame,
  index,
  handleGameClick,
}) => {
  const { liveScores } = useContext(DataContext);

  if (!gameData) return <Loading />;
  
  let focus = gameData.gameId === selectedGame ? true : false;
  
  let status = "FT";
  dayjs.extend(customParseFormat);
  if (!gameData.awayScore) status = dayjs(gameData.startTime, "HH:mm").format("h:mm A");
  
  // // thesportsdb livescores (getLiveScores endpoint)
  // if (liveScores?.[gameData.id_sdb_event]) {
  //   const { homeScore, awayScore, quarter, progress } =
  //     liveScores[gameData.id_sdb_event];
  //   gameData.awayScore = awayScore;
  //   gameData.homeScore = homeScore;
  //   status =
  //     quarter.slice(0, 1) === "Q"
  //       ? `${12 - Number(progress)}:00 - ${quarter}`
  //       : quarter;
  // }

  // balldontlie livescores (getLiveScores2 endpoint)
  if (liveScores?.[gameData.gameId]) {
    const { homeScore, awayScore, quarter, progress, gameStatus } =
      liveScores[gameData.gameId];
    gameData.awayScore = awayScore;
    gameData.homeScore = homeScore;
    status = gameStatus === "Final" ? "FT" : `${progress} ${quarter}Q`;
  }

  return (
    <Wrapper onClick={() => handleGameClick(gameData.gameId, index)}>
      <GameDiv focus={focus}>
        <Teams>
          {TEAM[gameData.awayTeam.abbr]?.location} at {TEAM[gameData.homeTeam.abbr]?.location}
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
