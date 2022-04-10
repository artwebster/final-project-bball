import { useContext } from "react";
import styled from "styled-components";
import { DataContext } from "../Hooks/DataContext";

const DateBar = () => {
  const { date, setDate } = useContext(DataContext);

  let yesterday = date.add(-1, "day");
  let tomorrow = date.add(1, "day");

  // changing the "current" date based on what the user clicks
  const handleDateClick = (val) => {
    setDate(date.add(val, "day"));
  };

  return (
    <Wrapper>
      <Date onClick={() => handleDateClick(-1)}>
        <span>{yesterday.format("ddd").toUpperCase()}</span>
        <span>{yesterday.format("MMM D")}</span>
      </Date>
      <Date>
        <span>{date.format("ddd").toUpperCase()}</span>
        <span>{date.format("MMM D")}</span>
      </Date>
      <Date onClick={() => handleDateClick(1)}>
        <span>{tomorrow.format("ddd").toUpperCase()}</span>
        <span>{tomorrow.format("MMM D")}</span>
      </Date>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const Date = styled.button`
  width: 5rem;
  padding-bottom: 0.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid red;
  span:first-child {
    font-size: 1.3rem;
    letter-spacing: 3px;
    font-weight: 300;
  }
  span:last-child {
    font-size: 0.8rem;
  }
`;

export default DateBar;
