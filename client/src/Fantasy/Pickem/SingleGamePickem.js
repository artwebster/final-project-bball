import styled from "styled-components";
import * as TEAM from "../../data/constants";
import { useState } from "react";
import { useContext } from "react";
import { AccountContext } from "../../Hooks/AccountContext";
import { useEffect } from "react";
import { DataContext } from "../../Hooks/DataContext";

const SingleGamePickem = ({ gameData, setPicks, picks, odds, setCheck }) => {
  const { screenSize } = useContext(AccountContext);
  const { date } = useContext(DataContext);
  const [selections, setSelections] = useState({
    spread: picks[gameData.gameId + "spread"]?.slice(0, 4) || null,
    ou: picks[gameData.gameId + "ou"]?.slice(0, 1) || null,
  });

  // updating picks as they're made
  const handleClickSpread = (ev) => {
    if (gameData.status === "Final") return;
    let updatedPicks = { ...picks };
    updatedPicks[gameData.gameId + "spread"] = ev.target.value;
    setPicks(updatedPicks);

    let tempSels = { ...selections };
    tempSels["spread"] = ev.target.value.slice(0, 4);
    setSelections(tempSels);
    setCheck(false);
  };

  const handleClickOU = (ev) => {
    if (gameData.status === "Final") return;
    let updatedPicks = { ...picks };
    updatedPicks[gameData.gameId + "ou"] = ev.target.value;
    setPicks(updatedPicks);

    let tempSels = { ...selections };
    tempSels["ou"] = ev.target.value.slice(0, 1);
    setSelections(tempSels);
    setCheck(false);
  };

  useEffect(() => {
    setSelections({});
  }, [date]);

  console.log("gameData", gameData);

  return (
    <Wrapper>
      <GameDiv>
        <Teams screenSize={screenSize}>
          <h5>Teams</h5>
          <div
            style={{
              background: `linear-gradient(to right, var(--secondary-color), var(--inbetween-color))`,
            }}
          >
            {(screenSize === "medium" || screenSize === "large") && (
              <Badge src={TEAM[gameData.awayTeam.abbr]?.badge} />
            )}
            <span>{TEAM[gameData.awayTeam.abbr]?.location}</span>
          </div>
          <div>
            {(screenSize === "medium" || screenSize === "large") && (
              <Badge src={TEAM[gameData.homeTeam.abbr]?.badge} />
            )}
            <span>at {TEAM[gameData.homeTeam.abbr]?.location}</span>
          </div>
        </Teams>
        <Spread screenSize={screenSize}>
          <h5>Spread</h5>
          <Button
            selected={selections.spread === "away" ? true : false}
            value={`awayTeamScore${odds?.spreadAway}`}
            onClick={(ev) => handleClickSpread(ev)}
          >
            {odds?.spreadAway}
          </Button>
          <Button
            selected={selections.spread === "home" ? true : false}
            value={`homeTeamScore${odds?.spreadHome}`}
            onClick={(ev) => handleClickSpread(ev)}
          >
            {odds?.spreadHome}
          </Button>
        </Spread>
        <OverUnderDiv screenSize={screenSize}>
          <h5>{screenSize === "small" ? "O/U" : "Over/Under"}</h5>
          <Button
            selected={selections.ou === "o" ? true : false}
            value={`o${odds?.overUnder}`}
            onClick={(ev) => handleClickOU(ev)}
          >
            o{odds?.overUnder}
          </Button>
          <Button
            selected={selections.ou === "u" ? true : false}
            value={`u${odds?.overUnder}`}
            onClick={(ev) => handleClickOU(ev)}
          >
            u{odds?.overUnder}
          </Button>
        </OverUnderDiv>
      </GameDiv>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  margin: 0.5rem 0;
  padding: 0;
  background-color: var(--inbetween-color);
  border-radius: 4px;
`;

const GameDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  h5 {
    margin: 6px;
  }
`;

const Teams = styled.div`
  width: 55%;
  text-align: left;
  display: flex;
  flex-direction: column;
  margin: 0;
  justify-content: flex-end;
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
`;

const Badge = styled.img`
  width: 30px;
`;

const Spread = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  margin: 0;
  align-items: flex-end;
  > button {
    padding-right: 0.4rem;
    height: ${({ screenSize }) =>
      screenSize === "medium" || screenSize === "large" ? "2rem" : "auto"};
  }
  button:first-child {
    border-bottom: 1px solid var(--secondary-color);
  }
`;

const OverUnderDiv = styled.div`
  display: flex;
  width: 25%;
  padding: 0 15px;
  margin: 0;
  flex-direction: column;
  align-items: flex-end;
  > button {
    padding-right: 0.4rem;
    height: ${({ screenSize }) =>
      screenSize === "medium" || screenSize === "large" ? "2rem" : "auto"};
  }
  button:first-child {
    border-bottom: 1px solid var(--secondary-color);
  }
`;

const Button = styled.button`
  width: 100%;
  text-align: right;
  background: ${({ selected }) => (selected ? "green" : "none")};
`;

export default SingleGamePickem;
