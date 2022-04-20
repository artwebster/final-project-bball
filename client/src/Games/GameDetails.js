import { useState } from "react";
import styled from "styled-components";
import GameHighlights from "./GameHighlights";
import GameStats from "./GameStats";

const GameDetails = ({ gameInfo }) => {
  const [gameDetails, setGameDetails] = useState("stats");

  const handleClick = (ev) => {
    setGameDetails(ev.target.value);
  };

  return (
    <Wrapper>
      <TopBar on>
        <Button value={"stats"} className={(gameDetails === "stats") && "active"} onClick={(ev) => handleClick(ev)}>GAME STATS</Button>
        <Button value={"highlights"} className={(gameDetails === "highlights") && "active"} onClick={(ev) => handleClick(ev)}>HIGHLIGHTS</Button>
      </TopBar>
      <MainDiv>
        {gameDetails === "stats" && <GameStats gameInfo={gameInfo} />}
        {gameDetails === "highlights" && <GameHighlights gameInfo={gameInfo} />}
      </MainDiv>
    </Wrapper>
  );
};

const Wrapper = styled.div`
width: 100%;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  font-weight: 300;
  width: 50%;
`;

const TopBar = styled.div`
  width: 100%;
  .active {
    background-color: var(--orange);
  }
`;

const MainDiv = styled.div``;

export default GameDetails;
