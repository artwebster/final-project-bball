import styled from "styled-components";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import * as TEAM from "../data/constants";
import Loading from "../Loading";
import { useContext } from "react";
import { DataContext } from "../Hooks/DataContext";
import { AccountContext } from "../Hooks/AccountContext";
import ExtraStats from "./ExtraStats";

const SingleGame = ({
  gameData,
  selectedGame,
  index,
  handleGameClick,
  topPlayers,
}) => {
  const { liveScores } = useContext(DataContext);
  const { screenSize } = useContext(AccountContext);

  if (!gameData) return <Loading />;
  let focus = gameData.gameId === selectedGame ? true : false;

  let status = "FT";
  dayjs.extend(customParseFormat);
  if (!gameData.awayScore) {
    status = dayjs(gameData.status, "HH:mm").format("h:mm A");
    status = gameData.status;
  }

  //===== LIVESCORES ENDPOINT 1 (thesportsdb)

  // if (liveScores?.[gameData.id_sdb_event]) {
  //   // console.log("liveScores:", liveScores);
  //   const { homeScore, awayScore, quarter, progress } =
  //     liveScores[gameData.id_sdb_event];
  //   gameData.awayScore = awayScore;
  //   gameData.homeScore = homeScore;
  //   status =
  //     quarter.slice(0, 1) === "Q"
  //       ? `${12 - Number(progress)}:00 - ${quarter}`
  //       : quarter;
  // }

  //===== LIVESCORES ENDPOINT 2 (balldontlie)

  if (liveScores?.[gameData.gameId]) {
    const { homeScore, awayScore, quarter, progress, gameStatus } =
      liveScores[gameData.gameId];
    gameData.awayScore = awayScore;
    gameData.homeScore = homeScore;
    status = gameStatus === "Final" ? "FT" : `${progress} ${quarter}Q`;
    if (progress === "" && quarter === 0) status = gameStatus.slice(0, -2);
    // if (progress === "" && quarter === "1") status = gameStatus;
    // status = gameStatus === "Final" ? "FT" : gameStatus;
  }

  let homeBold, awayBold;
  if (status === "FT") {
    awayBold = gameData.awayScore > gameData.homeScore ? "bold" : null;
    homeBold = gameData.awayScore > gameData.homeScore ? null : "bold";
  }

  return (
    <Wrapper onClick={() => handleGameClick(gameData.gameId, index)}>
      <GameDiv focus={focus}>
        <Teams screenSize={screenSize}>
          <div>
            {(screenSize === "medium" || screenSize === "large") && (
              <Badge src={TEAM[gameData.awayTeam.abbr]?.badge} />
            )}
            <span className={awayBold}>
              {TEAM[gameData.awayTeam.abbr]?.location}
            </span>
          </div>
          <div>
            {(screenSize === "medium" || screenSize === "large") && (
              <Badge src={TEAM[gameData.homeTeam.abbr]?.badge} />
            )}
            <span className={homeBold}>
              at {TEAM[gameData.homeTeam.abbr]?.location}
            </span>
          </div>
        </Teams>
        <Score screenSize={screenSize}>
          {gameData.awayScore === 0 && gameData.homeScore === 0 ? (
            <div>-</div>
          ) : (
            <>
              <span className={awayBold}>{gameData.awayScore}</span>
              <span className={homeBold}>{gameData.homeScore}</span>
            </>
          )}
        </Score>
        <Status>{status}</Status>
      </GameDiv>
      {focus && <ExtraStats topPlayers={topPlayers} />}
    </Wrapper>
  );
};

const Wrapper = styled.button`
  width: 100%;
  max-width: 700px;
  margin: 0.5rem 0;
  padding: 0;
  background-color: var(--inbetween-color);
  border-radius: 4px;
`;

const GameDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  background: ${({ focus }) => (focus ? `var(--highlight-color)` : "none")};
  border-radius: 4px 4px 0 0;
  .bold {
    font-weight: 700;
  }
`;

const Teams = styled.div`
  width: 55%;
  text-align: left;
  display: flex;
  flex-direction: column;
  margin: 0;
  img {
    margin-right: 0.7rem;
  }
  div {
    display: flex;
    border-top-left-radius: 4px;
    padding-left: 0.4rem;
    height: ${({ screenSize }) =>
      screenSize === "medium" || screenSize === "large" ? "2rem" : "auto"};
    align-items: center;
  }
  div:first-child {
    background-color: var(--secondary-color);
  }
`;

const Badge = styled.img`
  width: 30px;
`;

const Score = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  margin: 0;
  > span,
  div {
    text-align: right;
    padding-right: 0.4rem;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    height: ${({ screenSize }) =>
      screenSize === "medium" || screenSize === "large" ? "2rem" : "auto"};
  }
  span:first-child {
    background-color: var(--secondary-color);
  }
`;

const Status = styled.div`
  width: 20%;
  padding: 0 15px;
`;

export default SingleGame;
