import dayjs from "dayjs";
import { useEffect, useState, useContext } from "react";
import styled from "styled-components";

import { DataContext } from "../Hooks/DataContext";
import Loading from "../Loading";
import { IoCalendarOutline } from "react-icons/io5";
import CalendarModal from "./CalendarModal";

const Schedule = () => {
  const { gamesSched, getGamesSched } = useContext(DataContext);
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

  return (
    <Wrapper>
      {(modal) && <CalendarModal setModal={setModal} getGamesSched={getGamesSched} setDate={setDate} />}
      <Container>
        <Header>
          <h1>Schedule</h1>
          <IoCalendarOutline className="icon" onClick={()=> setModal(true)} />
        </Header>
        {week.map((day) => {
          return (
            <>
              <h2>{dayjs(day, "YYYY-MM-DD").format("ddd MMM DD")}</h2>
              {gamesSched.filter((game) => game.date === day)
                .length > 0 ? (
                gamesSched
                  .filter((game) => game.date === day)
                  .map((game) => {
                    return (
                      <GameDiv key={game.id}>
                        <NameDiv>
                          <div className="city">{game.homeTeam.fullName}</div>
                          <div> VS </div>
                          <div className="city">{game.awayTeam.fullName}</div>
                        </NameDiv>
                        <ScoreDiv>
                          <div className="score">{game.homeTeamScore}</div>
                          <div className="score">-{game.awayTeamScore}</div>
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
  width: 100%;
`;

const Container = styled.div`
  width: 35rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .icon {
    width: 1.5rem;
    height: 1.5rem;
    margin: 1rem;
    cursor: pointer;
  }
`;

const GameDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 1rem;
`;

const NameDiv = styled.div`
  display: flex;
  > div {
    width: 3rem;
  }
  .city {
    width: 13rem;
  }
`;

const ScoreDiv = styled.div`
  display: flex;
`;

export default Schedule;