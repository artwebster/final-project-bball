import { useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";

import SingleGame from "./SingleGame";
import GameDetails from "./GameDetails";
import { useEffect } from "react";

const Games = () => {
  const [games, setGames] = useState(null);
  const [odds, setOdds] = useState(null);
  const [gameId, setGameId] = useState(null);

  const today = dayjs().format("YYYY-MM-DD");
  const time = Math.floor(dayjs().unix());
  const endTime = time + 86400;

  // fetching the odds for all games and putting the data into state to use, 
  // faster than fetching individual game odds each time
  const getOdds = () => {
    fetch(`/api/get-game-odds?from=${time}&to=${endTime}`)
      .then((res) => res.json())
      .then((data) => {
        setOdds(data.data.events);
      })
      .catch((err) => console.log("err", err));
  };
  
  // fetching the scores and stats on mount, then calling the getOdds function
  useEffect(() => {
    console.log("function fired!");
    fetch(`https://www.balldontlie.io/api/v1/games?dates[]=${today}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("balldon'tliefetch", data);
      setGames(data.data);
    })
    .then(getOdds);
  }, []);
  
  // when a game is clicked, putting that game's data into state
  const handleGameClick = (gameid) => {
    if (gameId === gameid) {
      setGameId(null);
    } else setGameId(gameid);
  };

  return (
    <Container>
      <GameContainer>
        {games &&
          games.map((game) => {
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
  padding: 50px;
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
