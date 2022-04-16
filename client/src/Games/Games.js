import { useContext, useState, useEffect } from "react";
import styled from "styled-components";

import { DataContext } from "../Hooks/DataContext";
import SingleGame from "./SingleGame";
import Loading from "../Loading";
import DateBar from "./DateBar";
import GameDetails from "./GameDetails";
import { useLocation } from "react-router-dom";

const Games = () => {
  const { games, gameId, setGameId, date } = useContext(DataContext);
  const [currentGame, setCurrentGame] = useState(null)
  const location = useLocation();

  // closing any "open" game details page if clicking on the app logo
  useEffect(()=> {
    setCurrentGame(null);
  },[location.state])

  if (!games) return <Loading />

  // when a game is clicked, putting that game's id into state to render the details
  const handleGameClick = (gameid, index) => {
    if (gameId === gameid) {
      setGameId(null);
      setCurrentGame([games[index]]);
    } else if (gameId === null && currentGame) {
      setGameId(null);
      setCurrentGame(null)
    } else setGameId(gameid);
  };

  return (
    <Container>
      <DateBar setCurrentGame={setCurrentGame} />
      <GameContainer>
          {(currentGame || games).map((game, index) => {
            return (
              <SingleGame 
                handleGameClick={handleGameClick}
                gameData={game}
                index={index}
                key={game.gameId}
                selectedGame={gameId}
                date={date}
                setCurrentGame={setCurrentGame}
              />
            );
          })}
      </GameContainer>
      {(currentGame) && <GameDetails gameInfo={currentGame[0]}/>}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2.5rem;
`;

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: flex-start;
`;

export default Games;
