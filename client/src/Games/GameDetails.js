import { useEffect, useState } from "react";
import styled from "styled-components";
import GameStats from "./GameStats";
import GameOdds from "./GameOdds";

const GameDetails = ({ gameId }) => {
  const [detailsPage, setDetailsPage] = useState(true);
  const [gameDetails, setGameDetails] = useState(null);
  console.log("game clicked", gameId);

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    let date = (gameDetails.status(1,2) == 7) ? today.toISOString().slice(0, 10) : tomorrow.toISOString().slice(0, 10);

  const fetchGetOdds = () => {
    console.log("fetching odds");
    fetch(
      `https://sports-api.cloudbet.com/pub/v2/odds/fixtures?sport=basketball&date=${date}&limit=10`,
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
      .then((data) => console.log("CB data", data))
      .catch((err) => console.log("err", err));
  };

  const fetchGetStats = () => {
    console.log("fetching stats");
    fetch(`https://www.balldontlie.io/api/v1/stats?game_ids[]=${gameId}`)
      .then((res) => res.json())
      .then((data) => setGameDetails(data.data));
  };

  useEffect(() => {
    console.log("useEffect activated");
    fetchGetOdds();
    fetchGetStats();
  }, []);

  return (
    <Wrapper>
      <Header>
        <CatButton onClick={() => setDetailsPage(true)}>GAME STATS</CatButton>
        <CatButton onClick={() => setDetailsPage(false)}>GAME ODDS</CatButton>
      </Header>
      {detailsPage ? <GameStats gameDetails={gameDetails} /> : <GameOdds />}
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
`;

export default GameDetails;
