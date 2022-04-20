import styled from "styled-components";

const ExtraStats = ({ topPlayers }) => {
  if (!topPlayers)
    return <div>No game data available, please check back again later</div>;
  console.log("topplayers homie", topPlayers);
  if (!topPlayers[0])
    return <div>No game data available, please check back again later</div>;

  return (
    <>
      <PlayerStats>
        <span className="name">
          {topPlayers[0]?.player?.first_name} {topPlayers[0]?.player?.last_name}
        </span>
        <span className="stat">{topPlayers[0]?.pts} pts</span>
        <span className="stat">{topPlayers[0]?.reb} reb</span>
        <span className="stat">{topPlayers[0]?.ast} ast</span>
      </PlayerStats>
      <PlayerStats>
        <span className="name">
          {topPlayers[1]?.player?.first_name} {topPlayers[1]?.player?.last_name}
        </span>
        <span className="stat">{topPlayers[1]?.pts} pts</span>
        <span className="stat">{topPlayers[1]?.reb} reb</span>
        <span className="stat">{topPlayers[1]?.ast} ast</span>
      </PlayerStats>
    </>
  );
};

const PlayerStats = styled.div`
  display: flex;
  font-size: 0.9rem;
  .name {
    text-align: left;
    width: 50%;
    padding-left: 1rem;
  }
  .stat {
    width: 15%;
  }
`;

export default ExtraStats;
