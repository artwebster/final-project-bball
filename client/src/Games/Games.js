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
    fetch(
      `https://sports-api.cloudbet.com/pub/v2/odds/competitions/basketball-usa-nba?from=${time}&to=${endTime}&limit=50`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "X-API-Key":
            "eyJhbGciOiJSUzI1NiIsImtpZCI6Img4LThRX1YwZnlUVHRPY2ZXUWFBNnV2bktjcnIyN1YzcURzQ2Z4bE44MGMiLCJ0eXAiOiJKV1QifQ.eyJhY2Nlc3NfdGllciI6ImFmZmlsaWF0ZSIsImV4cCI6MTk2MzM0NTMwOSwiaWF0IjoxNjQ3OTg1MzA5LCJqdGkiOiJjZjM3ZjEzYi0yNDRjLTQ1ZDUtOTM2My1iMmE5YzhlN2IyMTgiLCJzdWIiOiIxMDE2MmVjYy0wNzg1LTQxNTQtOTJjNC02NDhiNDc4Yzk4OTAiLCJ0ZW5hbnQiOiJjbG91ZGJldCIsInV1aWQiOiIxMDE2MmVjYy0wNzg1LTQxNTQtOTJjNC02NDhiNDc4Yzk4OTAifQ.ZZUkZjMBV8FtiH6eFJhY4MVZl7GPgBSW-2RNfn7704uxoF19qRWzQLxIaEMkqrIz02gLqiQLYeHGY32dRadE5wUu98Z8xBRXAZaPsC0hO078IK4gVjlCHBTWP-AGkn4MbeIXiZqM-XBOfENpiQ3ccJ467Dtkglm14HqFnpuLPRvGnHlYzw9RhaLHh9H-VpQ5Jt0njcQITdmtoiYnF97NVi8erBOWpJd19JahEIMSQtpMJl3Ah7K8_OVx7h50J-BsxnmF2pM3P9tq7eKHmtmJUw6vDp5n4ZyNmRIzeN34tO6Yxv9IJNpvOuFsGHsZHLpww5aqSFDcpERtVDAuIggpvw",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("odds data from server:", data.events);
        setOdds(data.events);
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
  background-color: none;
  border: none;
  cursor: pointer;
`;

export default Games;
