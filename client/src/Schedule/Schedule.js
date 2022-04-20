import dayjs from "dayjs";
import { useState, useContext } from "react";
import styled from "styled-components";

import { DataContext } from "../Hooks/DataContext";
import Loading from "../Loading";
import { IoCalendarOutline } from "react-icons/io5";
import CalendarModal from "./CalendarModal";
import { AccountContext } from "../Hooks/AccountContext";

const Schedule = () => {
  const { gamesSched, getGamesSched } = useContext(DataContext);
  const { screenSize } = useContext(AccountContext)
  const [modal, setModal] = useState(false)
  const [date, setDate] = useState(dayjs());

  if (!gamesSched) {
    getGamesSched(dayjs());
    return <Loading />;
  }

  let week = [];
  let day = date;
  for (let i = 0; i < 7; i++) {
    week.push(day.format("YYYY-MM-DD"));
    day = day.add(1, "day");
  }

  console.log("gameSched", gamesSched);

  return (
    <Wrapper>
      {(modal) && <CalendarModal setModal={setModal} getGamesSched={getGamesSched} setDate={setDate} />}
      <Container>
        <Header>
          <h1>SCHEDULE</h1>
          <IoCalendarOutline className="icon" onClick={()=> setModal(true)} />
        </Header>
        {week.map((day) => {
          return (
            <>
              <h3>{dayjs(day, "YYYY-MM-DD").format("ddd MMM DD")}</h3>
              {gamesSched.filter((game) => game.date.slice(0,10) === day)
                .length > 0 ? (
                gamesSched
                  .filter((game) => game.date.slice(0,10) === day)
                  .map((game, index) => {
                    return (
                      <GameDiv key={game.id}>
                        <NameDiv className={index % 2 === 0 ? "even" : "odd"}>
                          <div className="city">{screenSize === "small" ? game.home_team.abbreviation : game.home_team.full_name}</div>
                          <div> VS </div>
                          <div className="city">{screenSize === "small" ? game.visitor_team.abbreviation : game.visitor_team.full_name}</div>
                        </NameDiv>
                        <ScoreDiv className={index % 2 === 0 ? "even" : "odd"}>
                          <div className="score">{game.home_team_score}</div>
                          <div className="score">-{game.visitor_team_score}</div>
                        </ScoreDiv>
                      </GameDiv>
                    );
                  })
              ) : (
                <span>No games scheduled</span>
              )}
            </>
          );
        })}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* width: 100%; */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
`;

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  h3 {
    background-color: var(--news-top);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .icon {
    width: 1.5rem;
    height: 1.5rem;
    margin-left: 1rem;
    cursor: pointer;
  }
  margin-bottom: 1rem;
`;

const GameDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0;
  .even {
    background-color: var(--secondary-color);
  }
`;

const NameDiv = styled.div`
  display: flex;
  width: 85%;
  > div {
  }
  .city {
    padding: 0 10px;
    width: 50%;
  }
`;

const ScoreDiv = styled.div`
  display: flex;
  width: 20%;
justify-content: flex-end;  
  padding-right: 5px;
`;

export default Schedule;