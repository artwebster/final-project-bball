import styled from "styled-components";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import * as TEAM from "../../data/constants";

const SingleGamePickem = ({ gameData, setPicks, picks, odds }) => {
  let awayTeam = gameData.awayTeam.abbr;
  let homeTeam = gameData.homeTeam.abbr;

  dayjs.extend(customParseFormat);
  let status = dayjs(gameData.startTime, "HH:mm").format("h:mm");

  // updating picks as they're made
  const handleClick = (ev) => {
    let updatedPicks = { ...picks };

    updatedPicks[ev.target.name] = ev.target.value;

    setPicks(updatedPicks);
  };

  return (
    <GameDiv onChange={handleClick}>
      <Teams>
        <span>{TEAM[awayTeam].teamName}</span>
        <span>at {TEAM[homeTeam].teamName}</span>
      </Teams>
      <SpreadDiv>
        <h5>Spread</h5>
        <input
          type="radio"
          name={gameData.gameId + "spread"}
          value={`${awayTeam}${odds?.spreadAway}`}
        />
        {odds?.spreadAway}
        <input
          type="radio"
          name={gameData.gameId + "spread"}
          value={`${homeTeam}${odds?.spreadHome}`}
        />
        {odds?.spreadHome}
      </SpreadDiv>
      <OverUnderDiv>
        <h5>Over/Under</h5>
        <input
          type="radio"
          name={gameData.gameId + "ou"}
          value={`o${odds?.overUnder}`}
        />
        o{odds?.overUnder}
        <input
          type="radio"
          name={gameData.gameId + "ou"}
          value={`u${odds?.overUnder}`}
        />
        u{odds?.overUnder}
      </OverUnderDiv>
      <Status>{status} PM</Status>
    </GameDiv>
  );
};

const GameDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  border: 1px solid red;
`;

const Teams = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 40%;
`;

const SpreadDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const OverUnderDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Status = styled.div``;

export default SingleGamePickem;
