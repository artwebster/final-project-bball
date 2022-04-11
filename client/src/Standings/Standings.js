import { useState, useContext } from "react";
import styled from "styled-components";
import { DataContext } from "../Hooks/DataContext";
import Loading from "../Loading";

const Standings = () => {
  const { standings, getStandings } = useContext(DataContext)
  const [sortMode, setSortMode] = useState("ConferenceRank");

  if (!standings) {
    getStandings();
    return <Loading />;
  }

  const handleClick = (ev) => {
    setSortMode(ev.target.value);
  };

  if (!standings) return <Loading />

  let standingsArr = [];
  if (sortMode === "LeagueRank") standingsArr = [[...standings]];
  if (sortMode === "ConferenceRank")
    standingsArr = [
      standings.filter((team) => team.Conference === "Eastern"),
      standings.filter((team) => team.Conference === "Western"),
    ];
  if (sortMode === "DivisionRank")
    standingsArr = [
      standings.filter((team) => team.Division === "Atlantic"),
      standings.filter((team) => team.Division === "Central"),
      standings.filter((team) => team.Division === "Southeast"),
      standings.filter((team) => team.Division === "Northwest"),
      standings.filter((team) => team.Division === "Pacific"),
      standings.filter((team) => team.Division === "Southwest"),
    ];

  return (
    <Wrapper>
      <Container>
        <Header>
          <h1>Standings</h1>
          <DisplaySelect onClick={handleClick}>
            <Selection value={"DivisionRank"}>Division</Selection>
            <Selection value={"ConferenceRank"}>Conference</Selection>
            <Selection value={"LeagueRank"}>League</Selection>
          </DisplaySelect>
        </Header>
        <TableDiv>
          {standingsArr.map((grouping, index) => {
            return (
              <Table key={index}>
                <thead>
                  <tr>
                    <th></th>
                    <th>
                      {sortMode === "ConferenceRank" && grouping[0].Conference}
                      {sortMode === "DivisionRank" && grouping[0].Division}
                    </th>
                    <th>W</th>
                    <th>L</th>
                    <th>Win%</th>
                    <th>GB</th>
                    <th>L10</th>
                    <th>Stk</th>
                  </tr>
                </thead>
                {grouping
                  .sort((a, b) => a[sortMode] - b[sortMode])
                  .map((team, index) => {
                    return (
                      <tbody key={index}>
                        <tr className={index % 2 === 0 ? "even" : "odd"}>
                          <td className={"rank"}>{index + 1}</td>
                          <td className={"name"}>
                            {team.City} {team.Name}
                          </td>
                          <td>{team.Wins}</td>
                          <td>{team.Losses}</td>
                          <td>{team.Percentage}</td>
                          <td className={"gb"}>{team.GamesBack}</td>
                          <td>
                            {team.LastTenWins}-{team.LastTenLosses}
                          </td>
                          <td>{team.StreakDescription}</td>
                        </tr>
                      </tbody>
                    );
                  })}
              </Table>
            );
          })}
        </TableDiv>
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DisplaySelect = styled.div``;

const Selection = styled.button`
  width: 6rem;
  &:hover {
    background-color: var(--secondary-color);
  }
  &:focus {
    background-color: green;
  }
`;

const TableDiv = styled.div``;

const Table = styled.table`
  width: 100%;
  th {
    text-align: left;
  }
  .even {
    background-color: var(--secondary-color);
  }
  .rank {
    width: 6%;
  }
  .name {
    width: 40%;
  }
  .gb {
    width: 9%;
  }
`;

export default Standings;
