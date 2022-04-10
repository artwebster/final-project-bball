import dayjs from "dayjs";
import Calendar from "react-calendar";
import styled from "styled-components";

const CalendarModal = ({ setModal, getGamesSched, setDate }) => {
  const handleDateClick = (day) => {
    let date = dayjs(day, "ddd MMM DD YYYY");
    setDate(date);
    getGamesSched(date);
    setModal(null);
  };

  return (
    <Modal onClick={() => setModal(null)}>
      <Wrapper onClick={(ev) => ev.stopPropagation()}>
        <Calendar
          minDate={new Date(2021, 9, 1)}
          maxDate={new Date(2022, 5, 30)}
          minDetail={"month"}
          next2Label={null}
          prev2Label={null}
          onChange={(day) => handleDateClick(day)}
        />
      </Wrapper>
    </Modal>
  );
};

const Modal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: baseline;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
`;

const Wrapper = styled.div`
  margin-top: 10rem;
  width: 20rem;
  background-color: var(--base-color);
  transition: all 0.3s;
`;

export default CalendarModal;
