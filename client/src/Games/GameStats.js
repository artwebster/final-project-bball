import styled from "styled-components";

const GameStats = ({ gameDetails }) => {

  return (
    <>
      <Grid>
        <div className="header">Name</div>
        <div className="header">Min</div>
        <div className="header">Pts</div>
        <div className="header">Rbs</div>
        <div className="header">Blks</div>
        <div className="header">Stls</div>
        <div className="header">Asts</div>
        {gameDetails?.map((player, index) => {
          let rowStagger=(index % 2 == 0) ? "even": "odd";
          return (
            <>
              <div className={rowStagger}>{player.player.first_name} {player.player.last_name}</div>
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
      background-color: lightgray;
  }
  > .header {
      font-weight: 700;
  }
`;

export default GameStats;
