import { useState, useContext, useEffect } from "react";
import styled from "styled-components";

import { DataContext } from "../Hooks/DataContext";
import SingleGame from "./SingleGame";
import GameDetails from "./GameDetails";
import Loading from "../Loading";
import DateBar from "./DateBar";

const Games = () => {
  const { games, odds, gameId, setGameId } = useContext(DataContext);

  if (!games || !odds) return <Loading />
  
  // when a game is clicked, putting that game's id into state to render the details
  const handleGameClick = (gameid) => {
    if (gameId === gameid) {
      setGameId(null);
    } else setGameId(gameid);
  };

  return (
    <Container>
      <DateBar />
      <GameContainer>
          {games.map((game) => {
            return (
              <>
                <SingleGameContainer
                  onClick={() => handleGameClick(game.id)}
                  key={"gc" + game.id}
                >
                  <SingleGame
                    gameData={game}
                    key={game.id}
                    selectedGame={gameId}
                  />
                </SingleGameContainer>
                {gameId === game.id && (
                  <GameDetails
                    gameId={gameId}
                    gamePreDetails={game}
                    odds={odds}
                  />
                )}
              </>
            );
          })}
      </GameContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 2.5rem;
`;

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: flex-start;
`;

const SingleGameContainer = styled.button`
  background-color: var(--base-color);
`;

export default Games;
