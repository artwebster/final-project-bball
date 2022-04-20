import styled from "styled-components";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import * as TEAM from "../../data/constants";
import { useState } from "react";
import { useEffect } from "react";

const SingleGamePickem = ({ gameData, setPicks, picks, odds }) => {
  const [selSpread, setSelSpread] = useState();
  const [selOU, setSelOU] = useState();

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

  

  useEffect(()=>{
    let updatedPicks = { ...picks };
    updatedPicks[ev.target.name] = ev.target.value;
    setPicks(updatedPicks);
  },[selSpread, selOU])

  return (
    <GameDiv onChange={handleClick}>
      <Teams>
        <span>{TEAM[awayTeam].teamName}</span>
        <span>at {TEAM[homeTeam].teamName}</span>
      </Teams>
      <SpreadDiv>
        <h5>Spread</h5>
        {/* <input
          type="radio"
          name={gameData.gameId + "spread"}
          value={`awayTeamScore${odds?.spreadAway}`}
        /> */}
        <button value={`awayTeamScore${odds?.spreadAway}`} onClick={(ev) => handleClick(ev)}>{odds?.spreadAway}</button>
        {/* <input
          type="radio"
          name={gameData.gameId + "spread"}
          value={`homeTeamScore${odds?.spreadHome}`}
        /> */}
        <button value={`homeTeamScore${odds?.spreadHome}`} onClick={(ev) => handleClick(ev)}>{odds?.spreadHome}</button>
      </SpreadDiv>
      <OverUnderDiv>
        <h5>Over/Under</h5>
        {/* <input
          type="radio"
          name={gameData.gameId + "ou"}
          value={`o${odds?.overUnder}`}
        /> */}
        <button value={`o${odds?.overUnder}`} onClick={(ev) => handleClick(ev)}>o{odds?.overUnder}</button>
        {/* <input
          type="radio"
          name={gameData.gameId + "ou"}
          value={`u${odds?.overUnder}`}
        /> */}  
        <button value={`u${odds?.overUnder}`} onClick={(ev) => handleClick(ev)}>u{odds?.overUnder}</button>
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
