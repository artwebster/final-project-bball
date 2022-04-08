import { useEffect, useState } from "react";
import styled from "styled-components";
import GameStats from "./GameStats";
import GameOdds from "./GameOdds";

const GameDetails = ({ gameId, gamePreDetails, odds }) => {
  const [detailsPage, setDetailsPage] = useState(true);
  const [gameDetails, setGameDetails] = useState(null);

  // getting the individual player stats for the selected game
  const getStats = () => {
    console.log("fetching stats");
    fetch(`https://www.balldontlie.io/api/v1/stats?game_ids[]=${gameId}`)
      .then((res) => res.json())
      .then((data) => setGameDetails(data.data));
  };

  useEffect(() => {
    getStats();
  }, []);

  return (
    <Wrapper>
      <Header>
        <CatButton className={detailsPage ? "active" : "inActive"} onClick={() => setDetailsPage(true)}>GAME STATS</CatButton>
        <CatButton className={detailsPage ? "inActive" : "active"} onClick={() => setDetailsPage(false)}>GAME ODDS</CatButton>
      </Header>
      {detailsPage ? <GameStats gameDetails={gameDetails} gamePreDetails={gamePreDetails} /> : <GameOdds odds={odds} gamePreDetails={gamePreDetails}/>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  /* width: 100%; */
  justify-content: space-between;
  border: 1px solid red;
`;

const CatButton = styled.button`
  background: none;
  width: 50%;
  border: 1px solid black;
  cursor: pointer; 
  &.inActive {
    background-color: var(--highlight-color);
  }
`;

export default GameDetails;
