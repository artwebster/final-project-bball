import { useContext, useState, useEffect } from "react";
import styled from "styled-components";

import { DataContext } from "../Hooks/DataContext";
import SingleGame from "./SingleGame";
import Loading from "../Loading";
import DateBar from "./DateBar";
import GameDetails from "./GameDetails";
import { useLocation } from "react-router-dom";
import { AccountContext } from "../Hooks/AccountContext";

const Games = () => {
  const { games, gameId, setGameId, date } = useContext(DataContext);
  const { screenSize } = useContext(AccountContext);
  const [playerStats, setPlayerStats] = useState(null);
  const [currentGame, setCurrentGame] = useState(null);
  const [topPlayers, setTopPlayers] = useState(null);
  const location = useLocation();

  // closing any "open" game details page if clicking on the app logo
  useEffect(() => {
    setCurrentGame(null);
  }, [location.state]);

  const fetchStats = (index) => {
    console.log("fetch stats fetched");
    let targetGame = games[index];

    fetch(
      `https://www.balldontlie.io/api/v1/games?start_date=${targetGame.date}&end_date=${targetGame.date}`
    )
      .then((res) => res.json())
      .then((data) => {
        let bdl_game = data.data.find(
          (game) => game.home_team.abbreviation === targetGame.homeTeam.abbr
        );

        fetch(
          `https://www.balldontlie.io/api/v1/stats?game_ids[]=${bdl_game.id}`
        )
          .then((res) => res.json())
          .then((data) => {
            let teamA = data.data.filter(
              (player) => player.team.abbreviation === targetGame.homeTeam.abbr
            );
            let teamB = data.data.filter(
              (player) => player.team.abbreviation === targetGame.awayTeam.abbr
            );
            let topPlayerA = teamA.sort((a, b) => b.pts - a.pts);
            let topPlayerB = teamB.sort((a, b) => b.pts - a.pts);
            setPlayerStats({ teamA, teamB });
            console.log("topPlayerA", topPlayerA);
            console.log("topPlayerB", topPlayerB);
            setTopPlayers([topPlayerA[0], topPlayerB[0]]);
          });
      });
  };

  if (!games) return <Loading />;

  // when a game is clicked, putting that game's id into state to render the details
  const handleGameClick = (gameid, index) => {
    if (gameId === gameid) {
      setGameId(null);
      setCurrentGame([games[index]]);
    } else if (gameId === null && currentGame) {
      setGameId(null);
      setCurrentGame(null);
    } else {
      setGameId(gameid);
      fetchStats(index);
    }
  };

  return (
    <Wrapper className={screenSize}>
      <DateBar source={"games"} setCurrentGame={setCurrentGame} />
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
              topPlayers={topPlayers}
            />
          );
        })}
        {currentGame && (
          <GameDetails gameInfo={currentGame[0]} playerStats={playerStats} />
        )}
      </GameContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;
  .large {
    margin: 0;
    padding: 0;
  }
`;

const GameContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 600px;
  flex-direction: column;
  justify-content: flex-start;
`;

export default Games;
