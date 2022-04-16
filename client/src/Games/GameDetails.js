import { useEffect, useState } from "react";
import styled from "styled-components";
import Loading from "../Loading";

const GameDetails = ({gameInfo}) => {
  const [gameDetails, setGameDetails] = useState(null);

  const getStats = () => {
    console.log("fetching stats");
    fetch(`https://www.balldontlie.io/api/v1/games?start_date=${gameInfo.date}&end_date=${gameInfo.date}`)
    .then(res => res.json())
    .then(data => {
      let bdl_game = data.data.find((game) => game.home_team.abbreviation === gameInfo.homeTeam.abbr);
      fetch(`https://www.balldontlie.io/api/v1/stats?game_ids[]=${bdl_game.id}`)
      .then(res => res.json())
      .then(data => {

      let teamA = data.data.filter((player) => player.team.abbreviation === gameInfo.homeTeam.abbr)
      let teamB = data.data.filter((player) => player.team.abbreviation === gameInfo.awayTeam.abbr)

      setGameDetails({ teamA, teamB })
      })
    })
  }

  useEffect(() => {
    getStats();
  }, [gameInfo]);

  if (!gameDetails) return <Loading />

  return (
    <Wrapper>
      <Body>
      <TeamName>{gameInfo.awayTeam.fullName}</TeamName>
      <Grid>
        <div className="header">Name</div>
        <div className="header">Min</div>
        <div className="header">Pts</div>
        <div className="header">Rbs</div>
        <div className="header">Blks</div>
        <div className="header">Stls</div>
        <div className="header">Asts</div>
        {gameDetails.teamB.map((player, index) => {
          let rowStagger = index % 2 === 0 ? "even" : "odd";
          return (
            <>
              <div className={rowStagger}>
                {player.player.first_name} {player.player.last_name}
              </div>
              <div className={rowStagger}>{player.min}</div>
              <div className={rowStagger}>{player.pts}</div>
              <div className={rowStagger}>{player.reb}</div>
              <div className={rowStagger}>{player.blk}</div>
              <div className={rowStagger}>{player.stl}</div>
              <div className={rowStagger}>{player.ast}</div>
            </>
          );
        })}
        </Grid>
        <TeamName>{gameInfo.homeTeam.fullName}</TeamName>
        <Grid>
        <div className="header">Name</div>
        <div className="header">Min</div>
        <div className="header">Pts</div>
        <div className="header">Rbs</div>
        <div className="header">Blks</div>
        <div className="header">Stls</div>
        <div className="header">Asts</div>
        {gameDetails.teamA.map((player, index) => {
          let rowStagger = index % 2 === 0 ? "even" : "odd";
          return (
            <>
              <div className={rowStagger}>
                {player.player.first_name} {player.player.last_name}
              </div>
              <div className={rowStagger}>{player.min}</div>
              <div className={rowStagger}>{player.pts}</div>
              <div className={rowStagger}>{player.reb}</div>
              <div className={rowStagger}>{player.blk}</div>
              <div className={rowStagger}>{player.stl}</div>
              <div className={rowStagger}>{player.ast}</div>
            </>
          );
        })}
      </Grid>
      </Body>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  border: 1px solid red;
`;

const Body = styled.div`
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr 1fr 1fr 1fr;
  width: 100%;
  > .odd {
    background-color: var(--secondary-color);
  }
  > .header {
    font-weight: 700;
  }
  margin-bottom: 0.5rem;
`;

const TeamName = styled.p`
  font-weight: 500;
`;

export default GameDetails;
