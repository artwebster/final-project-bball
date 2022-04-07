import styled from "styled-components";

const SingleGame = ({gameData}) => {
  return (
    <GameDiv>
      <Teams>
        {gameData.visitor_team.city} VS {gameData.home_team.city}
      </Teams>
      <Score>
        {gameData.visitor_team_score} - {gameData.home_team_score}
      </Score>
      <Status>{gameData.status}</Status>
    </GameDiv>
  );
};

const GameDiv = styled.div`
    display: flex;
    flex-direction: row;
`;

const Teams = styled.div`
    width: 300px;
`;

const Score = styled.div`
    width: 100px;
`;

const Status = styled.div`
    width: 100px;
`;

export default SingleGame;
