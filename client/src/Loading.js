import styled, { keyframes } from "styled-components";
import { FaBasketballBall } from "react-icons/fa";

const Loading = () => {
    return (
      <Wrapper>
        <LoadingDiv>
          Loading...
          <FaBasketballBall className="icon" />
        </LoadingDiv>
        </Wrapper>
      );
};

const rotate = keyframes`
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingDiv = styled.div`
  margin-top: 4rem;
  .icon {
    margin: 0.5rem 0;
    color: #f8510e;
    width: 5rem;
    height: 5rem;
    animation: ${rotate} 5000ms infinite;
    animation-delay: 0;
    animation-timing-function: linear;
  }
`;

export default Loading;