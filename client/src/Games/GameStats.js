import styled from "styled-components";

const GameStats = ({ gameDetails, gamePreDetails }) => {
  if (!gameDetails) return <div>No game stats yet, check back after tip off!</div>;

  // dividing the player stats into teams
  let teamA = gameDetails.filter(
    (player) => player.team.city === gamePreDetails.homeTeam.city
  );
  let teamB = gameDetails.filter(
    (player) => player.team.city === gamePreDetails.awayTeam.city
  );

  // sorting player stats based on points scored
  teamA.sort((a, b) => (a.pts > b.pts) ? -1: 1);
  teamB.sort((a, b) => (a.pts > b.pts) ? -1: 1);
    
  return (
    <>
      <TeamName>{gamePreDetails.awayTeam.fullName}</TeamName>
      <Grid>
        <div className="header">Name</div>
        <div className="header">Min</div>
        <div className="header">Pts</div>
        <div className="header">Rbs</div>
        <div className="header">Blks</div>
        <div className="header">Stls</div>
        <div className="header">Asts</div>
        {teamB.map((player, index) => {
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
        <TeamName>{gamePreDetails.homeTeam.fullName}</TeamName>
        <Grid>
        <div className="header">Name</div>
        <div className="header">Min</div>
        <div className="header">Pts</div>
        <div className="header">Rbs</div>
        <div className="header">Blks</div>
        <div className="header">Stls</div>
        <div className="header">Asts</div>
        {teamA.map((player, index) => {
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
    </>
  );
};

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

export default GameStats;
