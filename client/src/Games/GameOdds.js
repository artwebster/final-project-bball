import styled from "styled-components";
import { useContext, useState } from "react";
import { AccountContext } from "../Hooks/AccountContext";

const GameOdds = ({ odds, gamePreDetails }) => {
  const { userInfo, setUserInfo } = useContext(AccountContext);
  const [picks, setPicks] = useState({})

  // filter the odds array, finding just the chosen game
   const eventOdds = odds
    ? odds.find(
        (game) =>
          game.home?.abbreviation === gamePreDetails.home_team.abbreviation
      )
    : null;

    if (!eventOdds || Object.keys(eventOdds.markets).length === 0) return <div>No market data available, sorry!</div>;

  // parsing the odds information from the handicap API
  
  // SPREAD
  let spreadAway =
    eventOdds.markets[`basketball.handicap`].submarkets[
      `period=ot&period=ft`
    ].selections[1].params.slice(9);
  let spreadHome =
    eventOdds.markets["basketball.handicap"].submarkets[
      "period=ot&period=ft"
    ].selections[0].params.slice(9);
  spreadAway =
    spreadHome.slice(0, 1) === "-" ? spreadAway.slice(1) : "-" + spreadAway;

    // MONEYLINE
    let moneyLineAway = eventOdds.markets[`basketball.moneyline`].submarkets[`period=ot&period=ft`].selections[1].price
    let moneyLineHome = eventOdds.markets[`basketball.moneyline`].submarkets[`period=ot&period=ft`].selections[0].price
    // converting to NA notation
    moneyLineAway = moneyLineAway >= 2 ? (moneyLineAway - 1) * 100 :  -100 / (moneyLineAway - 1); 
    moneyLineHome = moneyLineHome >= 2 ? (moneyLineHome - 1) * 100 :  -100 / (moneyLineHome - 1); 

    // OVER/UNDER
    let overUnder = eventOdds.markets[`basketball.totals`].submarkets[`period=ot&period=ft`].selections[0].params.slice(6);

    // updating picks as they're made
    const handleClick = (ev, cat, third) => {
      let updatedPicks = {...picks};
      updatedPicks[cat] = ev.target.value;
      if (cat === "spread") updatedPicks.team = third;
      if (cat === "ou_val") updatedPicks.ou_pick = third;
      setPicks(updatedPicks);
    }

    // submitting the updated picks
    const handleSavePicks = () => {
      fetch("/api/save-picks", {
        method: "PATCH",
        body: JSON.stringify({user: userInfo.id, picks, gameid: gamePreDetails.id}),
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log("error:", err))
    };

  return (
    <Wrapper>
      <Table>
      <>
        <div></div>
        <div className="header">SPREAD</div>
        <div className="header">MONEYLINE</div>
        <div className="header">O/U</div>
      </>
      <>
        <div>{gamePreDetails.visitor_team.full_name}</div>
        {(userInfo) ? <button value={spreadAway} onClick={(ev) => handleClick(ev, "spread", gamePreDetails.visitor_team.abbreviation)}>{spreadAway}</button> : <div>{spreadAway}</div>}
        <div>{(Math.sign(moneyLineAway) === 1) && "+" }{Math.floor(moneyLineAway)}</div>
        {(userInfo) ? <button value={overUnder} onClick={(ev) => handleClick(ev, "ou_val", "over")}>o{overUnder}</button> : <div>o{overUnder}</div>}
      </>
      <>
        <div>{gamePreDetails.home_team.full_name}</div>
        {(userInfo) ? <button value={spreadHome} onClick={(ev) => handleClick(ev, "spread", gamePreDetails.home_team.abbreviation)}>{spreadHome}</button> : <div>{spreadHome}</div>}
        <div>{(Math.sign(moneyLineHome) === 1) && "+" }{Math.floor(moneyLineHome)}</div>
        {(userInfo) ? <button value={overUnder} onClick={(ev) => handleClick(ev, "ou_val", "under")}>u{overUnder}</button> : <div>u{overUnder}</div>}
      </>
      </Table>
      {(Object.values(picks).length === 4) && <SubmitButton onClick={handleSavePicks}>Save picks</SubmitButton>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  
`;

const Table = styled.div`
display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 2fr 2fr;
  > .header {
      font-size: 0.75rem;
      font-weight: 500;
  }
`;

const SubmitButton = styled.button`
  border: 1px solid red;  
`;

export default GameOdds;
