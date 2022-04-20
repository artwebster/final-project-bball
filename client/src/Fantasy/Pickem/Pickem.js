import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../../Hooks/DataContext";
import { AccountContext } from "../../Hooks/AccountContext";
import DateBar from "../../Games/DateBar";
import Loading from "../../Loading";
import SingleGamePickem from "./SingleGamePickem";
import { FaCheck } from "react-icons/fa";

const Pickem = () => {
  const { games, date, odds, getOdds } = useContext(DataContext);
  const { userInfo } = useContext(AccountContext);
  const [picks, setPicks] = useState({});
  const [check, setCheck] = useState(false);
  const [bottomMsg, setBottomMsg] = useState();
  const gameIdArray = [];

  useEffect(() => {
    if (!games) return;
    games.forEach((game) => {
      gameIdArray.push(game.gameId);
      getOdds(game.gameId);
    });
    if (games[0]?.status === "Final") {
      setBottomMsg("Games completed - no longer able to make picks");
    } else setBottomMsg("Click on a SPREAD and an OVER/UNDER for each game");
  }, [games]);

  // submitting the updated picks
  const handleSavePicks = () => {
    fetch("/api/save-picks", {
      method: "PATCH",
      body: JSON.stringify({
        user: userInfo.userId,
        date: date.format("YYYY-MM-DD"),
        userName: userInfo.username,
        picks,
        gameIds: games.map((game) => game.gameId),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) setCheck(true);
      })
      .catch((err) => console.log("error:", err));
  };

  console.log("GAMES", games);
  if (!odds || !games || odds.length < games.length) return <Loading />;

  console.log("PICKS", picks);

  return (
    <Wrapper>
      <DateBar source={"pickem"} setPicks={setPicks} setCheck={setCheck} />
      <Container>
        <h1>PICK'EM</h1>
        <GameContainer>
          {games.map((game) => {
            return (
              <SingleGamePickem
                gameData={game}
                key={game.id}
                setPicks={setPicks}
                picks={picks}
                odds={odds[game.gameId]}
                setCheck={setCheck}
              />
            );
          })}
        </GameContainer>
        {check ? (
          <CheckDiv>
            <FaCheck />
          </CheckDiv>
        ) : (
          <ButtonDiv>
            {Object.values(picks).length === games.length * 2 ? (
              <SubmitButton onClick={handleSavePicks}>Save Picks</SubmitButton>
            ) : (
              <p>{bottomMsg}</p>
            )}
          </ButtonDiv>
        )}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* width: 100%; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
`;

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: flex-start;
`;

const GameContainer = styled.div``;

const CheckDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 24px;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  > p {
    text-align: center;
    padding: 10px;
    border-radius: 4px;
    margin: 10px;
    background-color: #8b0000;
    font-size: 0.8rem;
  }
`;

const SubmitButton = styled.button`
  width: 5rem;
  height: 2.5rem;
  display: block;
  font-size: 0.8rem;
  background-color: var(--highlight-color);
  border-radius: 10px;
  padding: 5px 10px;
  margin: 15px;
`;

export default Pickem;
