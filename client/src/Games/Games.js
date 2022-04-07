import { useState } from "react";
import styled from "styled-components";

import SingleGame from "./SingleGame";
import GameDetails from "./GameDetails"

const Games = () => {
  const [games, setGames] = useState(null);
  const [gameId, setGameId] = useState(null);

  let today = new Date()
  let todayISO = today.toISOString().slice(0, 10)
  // const today = new Date()
  // console.log("today:", today);
  // const tomorrow = new Date(today);

  // let today = "2022-04-05"
  // tomorrow.setDate(tomorrow.getDate() + 1)
  // console.log("tomorrow:", tomorrow.toISOString().slice(0, 10));

  const handleBallDontLie = () => {
    console.log("function fired!");
    fetch(`https://www.balldontlie.io/api/v1/games?dates[]=${todayISO}`)
      .then((res) => res.json())
      .then((data) => setGames(data.data));
  };

  console.log("handleclick fired");

  // fetch("https://sports-api.cloudbet.com/pub/v2/odds/events/11438560", {
  //     method: "GET",
  //     headers: {
  //         'accept': 'application/json',
  //         // "Content-Type": "application/json",
  //         "X-API-Key": "eyJhbGciOiJSUzI1NiIsImtpZCI6Img4LThRX1YwZnlUVHRPY2ZXUWFBNnV2bktjcnIyN1YzcURzQ2Z4bE44MGMiLCJ0eXAiOiJKV1QifQ.eyJhY2Nlc3NfdGllciI6ImFmZmlsaWF0ZSIsImV4cCI6MTk2MzM0NTMwOSwiaWF0IjoxNjQ3OTg1MzA5LCJqdGkiOiJjZjM3ZjEzYi0yNDRjLTQ1ZDUtOTM2My1iMmE5YzhlN2IyMTgiLCJzdWIiOiIxMDE2MmVjYy0wNzg1LTQxNTQtOTJjNC02NDhiNDc4Yzk4OTAiLCJ0ZW5hbnQiOiJjbG91ZGJldCIsInV1aWQiOiIxMDE2MmVjYy0wNzg1LTQxNTQtOTJjNC02NDhiNDc4Yzk4OTAifQ.ZZUkZjMBV8FtiH6eFJhY4MVZl7GPgBSW-2RNfn7704uxoF19qRWzQLxIaEMkqrIz02gLqiQLYeHGY32dRadE5wUu98Z8xBRXAZaPsC0hO078IK4gVjlCHBTWP-AGkn4MbeIXiZqM-XBOfENpiQ3ccJ467Dtkglm14HqFnpuLPRvGnHlYzw9RhaLHh9H-VpQ5Jt0njcQITdmtoiYnF97NVi8erBOWpJd19JahEIMSQtpMJl3Ah7K8_OVx7h50J-BsxnmF2pM3P9tq7eKHmtmJUw6vDp5n4ZyNmRIzeN34tO6Yxv9IJNpvOuFsGHsZHLpww5aqSFDcpERtVDAuIggpvw"
  //     }
  //   })
  //   .then(res=>res.json())
  //   .then(data => console.log(data))
  //   .catch(err=> console.log("err", err))

  // }

  const handleGameClick = (gameid) => {
    gameId ? setGameId(null) : setGameId(gameid);
  };

  return (
    <Container>
      Get today's games:
      <Button onClick={() => handleBallDontLie()}>BALL DON'T LIE</Button>
      <GameContainer>
        {games &&
          games.map((game) => {
            return (
              <>
                <SingleGameContainer
                  onClick={() => handleGameClick(game.id)}
                  key={"gc" + game.id}
                >
                  <SingleGame gameData={game} key={game.id} selectedGame={gameId} />
                </SingleGameContainer>
                {gameId === game.id && <GameDetails gameId={gameId} />}
              </>
            );
          })}
      </GameContainer>
      {/* <Button onClick={() => handleCloudBet()}>CLOUD BET</Button> */}
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
  /* border: 2px solid blue; */
`;

const SingleGameContainer = styled.button`
  background-color: none;
  border: none;
  cursor: pointer;
  margin: 5px 0;
`;

const Button = styled.button`
  margin: 20px;
  padding: 5px 15px;
`;

export default Games;
