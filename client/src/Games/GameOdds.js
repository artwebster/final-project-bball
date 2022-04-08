import styled from "styled-components";

const GameOdds = ({ odds, gamePreDetails }) => {
  
  // filter the odds array, finding just the chosen game
   const eventOdds = odds
    ? odds.find(
        (game) =>
          game.home?.abbreviation === gamePreDetails.home_team.abbreviation
      )
    : null;

  if (!eventOdds) return <div>No market data available, sorry!</div>;

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

  return (
    <Wrapper>
      <>
        <div></div>
        <div className="header">SPREAD</div>
        <div className="header">MONEYLINE</div>
        <div className="header">O/U</div>
      </>
      <>
        <div>{gamePreDetails.visitor_team.full_name}</div>
        <div>{spreadAway}</div>
        <div>{(Math.sign(moneyLineAway) === 1) && "+" }{Math.floor(moneyLineAway)}</div>
        <div>{overUnder}</div>
      </>
      <>
        <div>{gamePreDetails.home_team.full_name}</div>
        <div>{spreadHome}</div>
        <div>{(Math.sign(moneyLineHome) === 1) && "+" }{Math.floor(moneyLineHome)}</div>
        <div></div>
      </>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 2fr 2fr;
  > .header {
      font-size: 0.75rem;
      font-weight: 500;
  }
`;

export default GameOdds;
