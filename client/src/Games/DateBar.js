import { useContext } from "react";
import styled from "styled-components";
import { DataContext } from "../Hooks/DataContext";
import { useHistory } from "react-router-dom";
import { AccountContext } from "../Hooks/AccountContext";

const DateBar = ({ setCurrentGame, setPicks, setCheck, source }) => {
  const { date, setDate } = useContext(DataContext);
  const { screenSize } = useContext(AccountContext);
  const history = useHistory();

  let yyYesterday = date.add(-3, "day");
  let yYesterday = date.add(-2, "day");
  let yesterday = date.add(-1, "day");

  let tomorrow = date.add(1, "day");
  let tTomorrow = date.add(2, "day");
  let ttTomorrow = date.add(3, "day");

  // setting the background of the dates, based on how many dates are rendered
  let yyBG, yBG, tBG, ttBG;
  if (screenSize === "large") {
    yyBG =
      "linear-gradient(to left, var(--large-size-step2), var(--large-size-step1))";
    yBG =
      "linear-gradient(to left, var(--inbetween-color), var(--large-size-step2))";
    tBG =
      "linear-gradient(to right, var(--inbetween-color), var(--large-size-step2))";
    ttBG =
      "linear-gradient(to right, var(--large-size-step2), var(--large-size-step1))";
  }
  if (screenSize === "medium") {
    yyBG =
      "linear-gradient(to left, var(--medium-size-step), var(--background-color))";
    yBG =
      "linear-gradient(to left, var(--inbetween-color), var(--medium-size-step))";
    tBG =
      "linear-gradient(to right, var(--inbetween-color), var(--medium-size-step))";
    ttBG =
      "linear-gradient(to right, var(--medium-size-step), var(--background-color))";
  }
  if (screenSize === "small") {
    yBG =
      "linear-gradient(to left, var(--inbetween-color), var(--background-color))";
    tBG =
      "linear-gradient(to right, var(--inbetween-color), var(--background-color))";
  }

  // changing the "current" date based on what the user clicks
  const handleDateClick = (val) => {
    setDate(date.add(val, "day"));

    if (source === "pickem") {
      setPicks({});
      setCheck(false);
      return;
    }

    setCurrentGame(null);
    history.push("/");
  };

  return (
    <Wrapper>
      {screenSize === "large" && (
        <Date
          onClick={() => handleDateClick(-3)}
          style={{
            background: `linear-gradient(to left, var(--large-size-step1), var(--background-color))`,
          }}
        >
          <span>{yyYesterday.format("ddd").toUpperCase()}</span>
          <span>{yyYesterday.format("MMM D")}</span>
        </Date>
      )}
      {(screenSize === "medium" || screenSize === "large") && (
        <Date onClick={() => handleDateClick(-2)} style={{ background: yyBG }}>
          <span>{yYesterday.format("ddd").toUpperCase()}</span>
          <span>{yYesterday.format("MMM D")}</span>
        </Date>
      )}
      <Date onClick={() => handleDateClick(-1)} style={{ background: yBG }}>
        <span>{yesterday.format("ddd").toUpperCase()}</span>
        <span>{yesterday.format("MMM D")}</span>
      </Date>

      <MiddleDate onClick={() => handleDateClick(0)}>
        <span>{date.format("ddd").toUpperCase()}</span>
        <span>{date.format("MMM D")}</span>
      </MiddleDate>

      <Date onClick={() => handleDateClick(1)} style={{ background: tBG }}>
        <span>{tomorrow.format("ddd").toUpperCase()}</span>
        <span>{tomorrow.format("MMM D")}</span>
      </Date>
      {(screenSize === "medium" || screenSize === "large") && (
        <Date onClick={() => handleDateClick(2)} style={{ background: ttBG }}>
          <span>{tTomorrow.format("ddd").toUpperCase()}</span>
          <span>{tTomorrow.format("MMM D")}</span>
        </Date>
      )}
      {screenSize === "large" && (
        <Date
          onClick={() => handleDateClick(3)}
          style={{
            background:
              "linear-gradient(to right, var(--large-size-step1), var(--background-color))",
          }}
        >
          <span>{ttTomorrow.format("ddd").toUpperCase()}</span>
          <span>{ttTomorrow.format("MMM D")}</span>
        </Date>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin: 1rem;
  > :first-child {
    width: 7rem;
    padding-left: 1.5rem;
  }
  > :last-child {
    width: 7rem;
    padding-right: 1.5rem;
  }
`;

const Date = styled.button`
  padding-bottom: 0.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 5.5rem;
  span:first-child {
    font-size: 1.3rem;
    letter-spacing: 3px;
    font-weight: 300;
  }
  span:last-child {
    font-size: 0.8rem;
  }
`;

const MiddleDate = styled(Date)`
  background-color: var(--inbetween-color);
  border: 1px solid var(--secondary-color);
  box-shadow: var(--box-shadow);
  width: 5rem;
  z-index: 1;
`;

export default DateBar;
