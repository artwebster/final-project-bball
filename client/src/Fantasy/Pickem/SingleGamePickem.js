import styled from "styled-components";
import dayjs from "dayjs";
import * as TEAM from "../../data/constants";
import { useContext } from "react";
import { DataContext } from "../../Hooks/DataContext";
import Loading from "../../Loading";

const SingleGamePickem = ({ gameData, setPicks, picks }) => {
    const {odds} = useContext(DataContext)
    
    if (!odds) return <Loading />

    const gameOdds = odds[gameData.id]

    let awayTeam = gameData.awayTeam.abbr || gameData.awayTeam;
    let homeTeam = gameData.homeTeam.abbr || gameData.homeTeam;
    if (homeTeam === "NO") homeTeam = "NOP";

    let status = dayjs(gameData.status).format("h:mm")

    // updating picks as they're made
    const handleClick = (ev) => {
        let updatedPicks = {...picks};

        updatedPicks[ev.target.name] = ev.target.value;
        
        setPicks(updatedPicks);
      }

  return (
    <GameDiv onChange={handleClick}>
      <Teams>
        <span>{TEAM[awayTeam].teamName}</span>
        <span>at {TEAM[homeTeam].teamName}</span>
      </Teams>
      <SpreadDiv>
          <h5>Spread</h5>
          <input type="radio" name={gameData.id+"spread"} value={`${awayTeam}${gameOdds?.spreadAway}`}/>{gameOdds?.spreadAway}
          <input type="radio" name={gameData.id+"spread"} value={`${homeTeam}${gameOdds?.spreadHome}`}/>{gameOdds?.spreadHome}
          {/* <input type="radio" name={gameData.id} value={gameOdds?.spreadHome} onClick={(ev) => handleClick(ev, "spread", homeTeam)}>{gameOdds?.spreadHome}</button> */}
      </SpreadDiv>
      <OverUnderDiv>
          <h5>Over/Under</h5>
          <input type="radio" name={gameData.id+"ou"} value={`o${gameOdds?.overUnder}`}/>o{gameOdds?.overUnder}
          <input type="radio" name={gameData.id+"ou"} value={`u${gameOdds?.overUnder}`}/>u{gameOdds?.overUnder}
          {/* <button value={gameOdds?.overUnder} onClick={(ev) => handleClick(ev, "ou_val", "over")}>o{gameOdds?.overUnder}</button>
          <button value={gameOdds?.overUnder} onClick={(ev) => handleClick(ev, "ou_val", "under")}>u{gameOdds?.overUnder}</button> */}
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

const Status = styled.div`
`;

export default SingleGamePickem;
