import styled from "styled-components";
import Loading from "../Loading";
import * as TEAM from "../data/constants";

const GameStats = ({ gameInfo, playerStats }) => {
  if (!playerStats) return <Loading />;

  return (
    <Wrapper>
      <Body>
        <TeamName color={TEAM[gameInfo.awayTeam.abbr].color}>
          {gameInfo.awayTeam.fullName}
        </TeamName>
        <Grid>
          <div className="header">Name</div>
          <div className="header">Min</div>
          <div className="header">Pts</div>
          <div className="header">Rbs</div>
          <div className="header">Blks</div>
          <div className="header">Stls</div>
          <div className="header">Asts</div>
          {playerStats.teamB.map((player, index) => {
            let rowStagger = index % 2 === 0 ? "even" : "odd";
            return (
              <>
                <div className={rowStagger}>
                  {player.player.first_name} {player.player.last_name}
                </div>
                <div className={rowStagger}>{player.min}</div>
                <div className={rowStagger} style={{ padding: "0 5px" }}>
                  {player.pts}
                </div>
                <div className={rowStagger}>{player.reb}</div>
                <div className={rowStagger}>{player.blk}</div>
                <div className={rowStagger}>{player.stl}</div>
                <div className={rowStagger}>{player.ast}</div>
              </>
            );
          })}
        </Grid>
        <TeamName color={TEAM[gameInfo.homeTeam.abbr].color}>
          {gameInfo.homeTeam.fullName}
        </TeamName>
        <Grid>
          <div className="header">Name</div>
          <div className="header">Min</div>
          <div className="header">Pts</div>
          <div className="header">Rbs</div>
          <div className="header">Blks</div>
          <div className="header">Stls</div>
          <div className="header">Ast</div>
          {playerStats.teamA.map((player, index) => {
            let rowStagger = index % 2 === 0 ? "even" : "odd";
            return (
              <>
                <div className={rowStagger}>
                  {player.player.first_name} {player.player.last_name}
                </div>
                <div className={rowStagger}>{player.min}</div>
                <div className={rowStagger} style={{ padding: "0 5px" }}>
                  {player.pts}
                </div>
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
`;

const Body = styled.div``;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr 1fr 1fr 1fr;
  width: 100%;
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
  > .odd {
    background-color: var(--secondary-color);
  }
  > .header {
    font-weight: 700;
  }
`;

const TeamName = styled.p`
  font-weight: 500;
  color: #eee;
  padding-left: 6px;
  background: ${({ color }) => color};
`;

export default GameStats;
