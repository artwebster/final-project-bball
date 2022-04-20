import styled from "styled-components";
import { useContext, useState } from "react";
import { AccountContext } from "../Hooks/AccountContext";
import { DataContext } from "../Hooks/DataContext";

const GameOdds = ({ gamePreDetails }) => {
  const { userInfo } = useContext(AccountContext);
  const { odds } = useContext(DataContext);
  const [picks, setPicks] = useState({});

  const { spreadAway, spreadHome, overUnder } = odds[gamePreDetails.id];

  // updating picks as they're made
  const handleClick = (ev, cat, third) => {
    let updatedPicks = { ...picks };
    updatedPicks[cat] = ev.target.value;
    if (cat === "spread") updatedPicks.team = third;
    if (cat === "ou_val") updatedPicks.ou_pick = third;
    setPicks(updatedPicks);
  };

  // submitting the updated picks
  const handleSavePicks = () => {
    fetch("/api/save-picks", {
      method: "PATCH",
      body: JSON.stringify({
        user: userInfo.id,
        date: gamePreDetails.date,
        away: gamePreDetails.awayTeam.abbr,
        home: gamePreDetails.homeTeam.abbr,
        userName: userInfo.username,
        picks,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log("error:", err));
  };

  return (
    <Wrapper>
      <Table>
        <>
          <div></div>
          <div className="header">SPREAD</div>
          <div className="header">O/U</div>
        </>
        <>
          <div>{gamePreDetails.awayTeam.fullName}</div>
          {userInfo ? (
            <button
              value={spreadAway}
              onClick={(ev) =>
                handleClick(ev, "spread", gamePreDetails.awayTeam.abbr)
              }
            >
              {spreadAway}
            </button>
          ) : (
            <div>{spreadAway}</div>
          )}
          {userInfo ? (
            <button
              value={overUnder}
              onClick={(ev) => handleClick(ev, "ou_val", "over")}
            >
              o{overUnder}
            </button>
          ) : (
            <div>o{overUnder}</div>
          )}
        </>
        <>
          <div>{gamePreDetails.homeTeam.fullName}</div>
          {userInfo ? (
            <button
              value={spreadHome}
              onClick={(ev) =>
                handleClick(ev, "spread", gamePreDetails.homeTeam.abbr)
              }
            >
              {spreadHome}
            </button>
          ) : (
            <div>{spreadHome}</div>
          )}
          {userInfo ? (
            <button
              value={overUnder}
              onClick={(ev) => handleClick(ev, "ou_val", "under")}
            >
              u{overUnder}
            </button>
          ) : (
            <div>u{overUnder}</div>
          )}
        </>
      </Table>
      {Object.values(picks).length === 4 && (
        <SubmitButton onClick={handleSavePicks}>Save picks</SubmitButton>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Table = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
  grid-template-rows: 1fr 2fr 2fr;
  > .header {
    font-size: 0.75rem;
    font-weight: 500;
  }
`;

const SubmitButton = styled.button`
  border: 1px solid red;
`;

export default GameOdds;
