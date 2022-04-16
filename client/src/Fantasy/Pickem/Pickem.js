import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../../Hooks/DataContext";
import { AccountContext } from "../../Hooks/AccountContext";
import DateBar from "../../Games/DateBar";
import Loading from "../../Loading";
import SingleGamePickem from "./SingleGamePickem";

const Pickem = () => {
    const { games, date, odds, getOdds } = useContext(DataContext);
    const {userInfo} = useContext(AccountContext);
    const [picks, setPicks] = useState({})

    useEffect(() => {
      if (!games) return;
      games.forEach((game) => {
        getOdds(game.gameId);
      })
    }, [games])
    
    // submitting the updated picks
    const handleSavePicks = () => {
      fetch("/api/save-picks", {
        method: "PATCH",
        body: JSON.stringify({
          user: userInfo.id, 
          date: date.format("YYYY-MM-DD"),
          userName: userInfo.username,
          picks, 
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log("error:", err))
    };

    if (!odds || odds.length < games.length) return <Loading />

    return (
        <Wrapper>
            <Container>
                <h1>Pick'Em</h1>
                <DateBar />
                  <GameContainer>
                  {games.map((game) => {
                    return <SingleGamePickem gameData={game} key={game.id} setPicks={setPicks} picks={picks} odds={odds[game.gameId]} />
                  })}
                  </GameContainer>
                  {(Object.values(picks).length === games.length*2) && <SubmitButton onClick={handleSavePicks}>Save picks</SubmitButton>}
            </Container>
        </Wrapper>
    )

};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  max-width: 35rem;
  display: flex;
  flex-direction: column;
  align-items: center;

`;

const GameContainer = styled.div`
  min-width: 30rem;
`;

const SubmitButton = styled.button`
  border: 1px solid red;  
`;

export default Pickem;