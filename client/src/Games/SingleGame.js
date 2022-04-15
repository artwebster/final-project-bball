import styled from "styled-components";
import dayjs from "dayjs";
import * as TEAM from "../data/constants"

const SingleGame = ({ gameData, selectedGame, date }) => {
  let focus = gameData.id === selectedGame ? true : false;

  let status = gameData.status;
  if (date > dayjs()) {
    status = dayjs(status).format("h:mm")
  }

  let awayTeam = gameData.awayTeam.abbr || gameData.awayTeam;
  let homeTeam = gameData.homeTeam.abbr || gameData.homeTeam;
  if (homeTeam === "NO") homeTeam = "NOP";

  return (
    <GameDiv focus={focus}>
      <Teams>
        {TEAM[awayTeam].location} VS {TEAM[homeTeam].location}
      </Teams>
      <Score>
        {gameData.awayTeamScore} - {gameData.homeTeamScore}
      </Score>
      <Status>{status}</Status>
    </GameDiv>
  );
};

const GameDiv = styled.div`
  display: flex;
  flex-direction: row;
  background: ${({ focus }) => (focus ? `var(--highlight-color)` : "none")};
`;

const Teams = styled.div`
  width: 300px;
`;

const Score = styled.div`
  width: 100px;
`;

const Status = styled.div`
  width: 100px;
`;

export default SingleGame;
