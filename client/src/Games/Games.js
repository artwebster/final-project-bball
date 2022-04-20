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
  

//   const [serverError, setServerError] = useState(false)
// useEffect(() => {
//   console.log("USE EFFECT ONE FIRE");
//   if (!games) var error = setTimeout(() => setServerError(true), 3000)
//   return clearTimeout(error); 
//   },[games])
  
// console.log("serverError::", serverError);
//   if (serverError) return <div style={{padding: "4rem"}}>Could not connect to server, please check your internet connection and try again.</div>

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
    <Wrapper>
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
      {(currentGame) && <GameDetails gameInfo={currentGame[0]}/>}
      </GameContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  /* width: 900px; */
  /* max-width: 600px; */
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;
  /* border: 1px solid red; */
`;

const GameContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 600px;
  /* border:1px solid blue; */
  flex-direction: column;
  /* align-items: center; */
  justify-content: flex-start;
`;

export default Games;
